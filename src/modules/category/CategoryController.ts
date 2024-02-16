import _ from "lodash"

import Logger from "../../providers/Logger"
import CategoryService from "../../providers/CategoryService"
import DI from "../../DI"
import ICategory from "../../interfaces/ICategory"
import IApiSuccess from "../../interfaces/IApiSuccess"
import { NotFound } from "../../exceptions"

class CategoryController {
  constructor({ logger, categoryService }: typeof DI) {
    this.logger = logger
    this.categoryService = categoryService
  }
  private readonly logger: Logger
  private readonly categoryService: CategoryService

  create = async ({
    payload,
  }: {
    payload: ICategory
  }): Promise<IApiSuccess> => {
    return {
      data: await this.categoryService.create(payload),
      httpStatus: 201,
    }
  }

  find = async ({
    query,
  }: {
    query: {
      page: number | undefined
      limit: number | undefined
      search_name: string | undefined
    }
  }): Promise<IApiSuccess> => {
    const { limit, page, search_name } = query
    const customers = await this.categoryService.findByPagination({
      limit: limit,
      page: page,
      searchName: search_name,
    })
    return {
      data: customers,
    }
  }

  delete = async ({
    params: { id },
  }: {
    params: { id: string }
  }): Promise<IApiSuccess> => {
    const isDeleted = await this.categoryService.delete(id)
    if (!isDeleted) throw new NotFound("Category not found")
    return {}
  }

  updateById = async ({
    params: { id },
    payload,
  }: {
    params: { id: string }
    payload: Partial<ICategory>
  }): Promise<IApiSuccess> => {
    const updatedCustomer = await this.categoryService.updateById(id, payload)
    return {
      data: updatedCustomer,
    }
  }

  getById = async ({
    params: { id },
  }: {
    params: { id: string }
  }): Promise<IApiSuccess> => {
    const category = await this.categoryService.findByID(id)
    if (!category) throw new NotFound()
    return {
      data: category,
    }
  }
}

export default CategoryController
