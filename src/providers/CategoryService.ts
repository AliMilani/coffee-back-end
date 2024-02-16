import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination"
import ICategory from "../interfaces/ICategory"
import Category from "../models/Category"

class CategoryService {
  create = async (payload: ICategory) => {
    return (await Category.create(payload)).toObject()
  }

  updateById = async (id: string, payload: Partial<ICategory>) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean()
    if (!updatedCategory) throw new Error("Not found by id")
    return updatedCategory
  }

  findByID = (id: string) => {
    return Category.findById(id).lean()
  }

  findByPagination = async ({
    searchName = "",
    page = 1,
    limit = 10,
  }: {
    searchName: string | undefined
    page: number | undefined
    limit: number | undefined
  }) => {
    const pipeLine = paginationPipeLine<ICategory>({
      page,
      limit,
      filter: {
        name: { $regex: searchName, $options: "i" },
      },
    })
    const [result] = await Category.aggregate(pipeLine)

    return {
      ...result,
    }
  }

  delete = async (id: string): Promise<boolean> => {
    const deletedCategory = await Category.findByIdAndDelete(id)
    return !!deletedCategory
  }
}

export default CategoryService
