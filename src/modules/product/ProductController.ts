import _ from "lodash";

import Logger from "../../providers/Logger";
import ProductService from "../../providers/ProductService";
import DI from "../../DI";
import IProduct from "../../interfaces/IProduct";
import IApiSuccess from "../../interfaces/IApiSuccess";
import { NotFound } from "../../exceptions";

class ProductController {
  constructor({ logger, productService }: typeof DI) {
    this.logger = logger;
    this.productService = productService;
  }
  private readonly logger: Logger;
  private readonly productService: ProductService;

  create = async ({ payload }: { payload: IProduct }): Promise<IApiSuccess> => {
    return {
      data: await this.productService.create(payload),
      httpStatus: 201,
    };
  };

  find = async ({
    query,
  }: {
    query: {
      search_name: string | undefined;
      page: string | undefined;
      limit: string | undefined;
    };
  }): Promise<IApiSuccess> => {
    const { limit, page, search_name } = query;
    const customers = await this.productService.findByPagination({
      limit: _.isString(limit) ? +limit : undefined,
      page: _.isString(page) ? +page : undefined,
      searchName: search_name,
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
    const isDeleted = await this.productService.delete(id);
    if (!isDeleted) throw new NotFound("Product not found");
    return {};
  };

  updateById = async ({
    params: { id },
    payload,
  }: {
    params: { id: string };
    payload: Partial<IProduct>;
  }): Promise<IApiSuccess> => {
    const updatedCustomer = await this.productService.updateById(id, payload);
    return {
      data:updatedCustomer
    };
  };

  getById = async ({
    params: { id },
  }: {
    params: { id: string };
  }): Promise<IApiSuccess> =>{
    const product = await this.productService.findByID(id)
    if(!product) throw new NotFound()
    return {
      data: product,
    }
  }
}


export default ProductController