import _ from "lodash";

import DI from "../../DI";
import IApiSuccess from "../../interfaces/IApiSuccess";
import ICustomer from "../../interfaces/ICustomer";
import CustomerService from "../../providers/CustomerService";
import Logger from "../../providers/Logger";
import { Conflict, NotFound } from "../../exceptions";

class CustomerController {
  constructor({ logger, customerService }: typeof DI) {
    this.logger = logger;
    this.customerService = customerService;
  }
  private readonly logger: Logger;
  private readonly customerService: CustomerService;

  create = async ({
    payload,
  }: {
    payload: ICustomer;
  }): Promise<IApiSuccess> => {
    try {
      return {
        data: await this.customerService.create(payload),
        httpStatus: 201,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Phone number already exists"
      )
        throw new Conflict("DUPLICATE_PHONE_NUMBER");
      throw error;
    }
  };

  find = async ({
    query,
  }: {
    query: {
      search_keyword: string | undefined;
      page: string | undefined;
      limit: string | undefined;
    };
  }): Promise<IApiSuccess> => {
    const { limit, page, search_keyword } = query;
    const customers = await this.customerService.findByPagination({
      limit: _.isString(limit) ? +limit : undefined,
      page: _.isString(page) ? +page : undefined,
      searchKeyword: search_keyword,
    });
    return {
      data: customers,
    };
  };

  delete = async ({
    params: { id },
  }: {
    params: { id: string };
  }): Promise<IApiSuccess> => {
    const isDeleted = await this.customerService.delete(id);
    if (!isDeleted) throw new NotFound("Customer not found");
    return {};
  };

  updateById = async ({
    params: { id },
    payload,
  }: {
    params: { id: string };
    payload: Partial<ICustomer>;
  }): Promise<IApiSuccess> => {
    const updatedCustomer = await this.customerService.updateById(id, payload); // TODO: catch not found
    return {
      data: updatedCustomer,
    };
  };

  getById = async ({
    params: { id },
  }: {
    params: { id: string };
  }): Promise<IApiSuccess> =>{
    const customer = await this.customerService.findByID(id)
    if(!customer) throw new NotFound()
    return {
      data: customer,
    }
  }
}

export default CustomerController;
