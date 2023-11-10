import DI from "../../DI";
import IApiSuccess from "../../interfaces/IApiSuccess";
import ICustomer from "../../interfaces/ICustomer";
import CustomerService from "../../providers/CustomerService";
import Logger from "../../providers/Logger";

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
    this.logger.log("warn","test")
    return {
      data: await this.customerService.create(payload),
      httpStatus: 201,
    };
  };

  
}

export default CustomerController;
