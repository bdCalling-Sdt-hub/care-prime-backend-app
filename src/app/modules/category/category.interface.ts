import { Model, Types } from 'mongoose';

export type ICategory = {
  _id?: Types.ObjectId;
  name: string;
  image: string;
  sortOrder: number;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>