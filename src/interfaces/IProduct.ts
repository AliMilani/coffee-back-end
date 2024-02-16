import { ObjectId } from "mongoose";

export default interface IProduct {
  _id: ObjectId | string;
  category?: ObjectId | string;
  name: string;
  price: number;
  inStock: boolean;
}
