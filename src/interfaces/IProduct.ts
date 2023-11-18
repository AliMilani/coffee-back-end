import { ObjectId } from "mongoose"

export default interface IProduct {
    _id?:ObjectId | string
    name:string,
    price:number,
    inStock:boolean
  }
  