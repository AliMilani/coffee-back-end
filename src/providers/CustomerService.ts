import Customer from "../models/Customer";
import ICustomer from "../interfaces/ICustomer";

class CustomerService {
  findByID = (id: string) => {
    return Customer.findById(id).lean();
  };

  findOneByPhone = (phoneNumber: string) => {
    return Customer.findOne({ phoneNumber }).lean();
  };

  create = async (payload: ICustomer) => {
    return (await Customer.create(payload)).toObject()
  };
}

export default CustomerService;
