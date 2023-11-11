import Customer from "../models/Customer";
import ICustomer from "../interfaces/ICustomer";
import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination";

class CustomerService {
  findByID = (id: string) => {
    return Customer.findById(id).lean();
  };

  findOneByPhone = (phoneNumber: string) => {
    return Customer.findOne({ phoneNumber }).lean();
  };

  create = async (payload: ICustomer) => {
    return (await Customer.create(payload)).toObject();
  };

  find = async ({ searchKeyword = "", page = 1, limit = 10 }:{
      searchKeyword: string | undefined;
      page: number | undefined;
      limit: number | undefined;
    }) => {
    const pipeLine =  paginationPipeLine<ICustomer>(
      {
        page,
        limit,
        filter:{
          $or: [
            { firstName: { $regex: searchKeyword, $options: "i" } },
            { lastName: { $regex: searchKeyword, $options: "i" } },
            { phoneNumber: { $regex: searchKeyword, $options: "i" } },
            { personalCode: { $regex: searchKeyword, $options: "i" } },
          ],
      }
      });
    const result = await Customer.aggregate(pipeLine)

    return {
      ...result[0]
    };
  };
}

export default CustomerService;
