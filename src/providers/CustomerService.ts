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
    return (await Customer.create(payload)).toObject();
  };

  find = async ({ searchKeyword = "", page = 1, limit = 10 }:{
      searchKeyword: string | undefined;
      page: number | undefined;
      limit: number | undefined;
    }) => {
    const result = (await (Customer.aggregate([
      {
        $match: {
          $or: [
            { firstName: { $regex: searchKeyword, $options: "i" } },
            { lastName: { $regex: searchKeyword, $options: "i" } },
            { phoneNumber: { $regex: searchKeyword, $options: "i" } },
            { personalCode: { $regex: searchKeyword, $options: "i" } },
          ],
        },
      },
      {
        $facet: {
          items: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            { $project: { __v: 0 } },
          ],
          total: [{ $count: "total" }],
        },
      },
      {
        $project: {
          items: 1,
          total: { $arrayElemAt: ["$total.total", 0] },
        },
      },
    ]) as unknown)) as [
      {
        items: (ICustomer & { _id: string })[];
        total: number;
      }
    ];

    const { items, total } = result[0];

    return {
      items,
      total,
      page,
      limit,
    };
  };
}

export default CustomerService;
