import _ from "lodash"

import Customer from "../models/Customer"
import ICustomer from "../interfaces/ICustomer"
import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination"

class CustomerService {
  create = async (payload: ICustomer) => {
    try {
      const createdCustomer = await Customer.create(payload)
      return createdCustomer.toObject()
    } catch (error: unknown) {
      if (_.get(error, "keyPattern.phoneNumber", null))
        throw new Error("Phone number already exists")
      if (_.get(error, "keyPattern.personalCode", null))
        throw new Error("personal Code already exists")
      throw error
    }
  }

  updateById = async (id: string, payload: Partial<ICustomer>) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean()
    if (!updatedCustomer) throw new Error("Not found by id")
    return updatedCustomer
  }

  findByID = (id: string) => {
    return Customer.findById(id).lean()
  }

  findOneByPhone = (phoneNumber: string) => {
    return Customer.findOne({ phoneNumber }).lean()
  }

  findByPagination = async ({
    searchKeyword = "",
    page = 1,
    limit = 10,
  }: {
    searchKeyword: string | undefined
    page: number | undefined
    limit: number | undefined
  }) => {
    const pipeLine = paginationPipeLine<ICustomer>({
      page,
      limit,
      filter: {
        $or: [
          { firstName: { $regex: searchKeyword, $options: "i" } },
          { lastName: { $regex: searchKeyword, $options: "i" } },
          { phoneNumber: { $regex: searchKeyword, $options: "i" } },
          { personalCode: { $regex: searchKeyword, $options: "i" } },
        ],
      },
    })
    const result = await Customer.aggregate(pipeLine)

    return {
      ...result[0],
    }
  }

  delete = async (id: string): Promise<boolean> => {
    const deletedCustomer = await Customer.findByIdAndDelete(id)
    return !!deletedCustomer
  }
}

export default CustomerService
