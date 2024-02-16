import { ObjectId } from "mongoose"

export default interface ICategory {
  _id?: ObjectId | string
  name: string
}
