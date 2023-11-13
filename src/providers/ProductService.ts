import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination";
import IProduct from "../interfaces/IProduct";
import Product from "../models/Product";

class ProductService {
  create = async (payload: IProduct) => {
    return (await Product.create(payload)).toObject();
  };

  updateById = async (id: string, payload: Partial<IProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean()
    if (!updatedProduct) throw new Error("Not found by id");
    return updatedProduct
  };

  findByID = (id: string) => {
    return Product.findById(id).lean();
  };

  findByPagination = async ({
    searchName = "",
    page = 1,
    limit = 10,
  }: {
    searchName: string | undefined;
    page: number | undefined;
    limit: number | undefined;
  }) => {
    const pipeLine = paginationPipeLine<IProduct>({
      page,
      limit,
      filter: {
        name: { $regex: searchName, $options: "i" }
      },
    });
    const result = await Product.aggregate(pipeLine);

    return {
      ...result[0],
    };
  };

  delete = async (id: string): Promise<boolean> => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return !!deletedProduct;
  };
}

export default ProductService
