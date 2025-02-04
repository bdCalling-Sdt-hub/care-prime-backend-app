import { Model, Types } from "mongoose"

export type IBlog = {
    _id: Types.ObjectId;
    image: string;
    title: string;
    summary: string;
    description: string;
    source?: string;
}
export type BlogModel = Model<IBlog, Record<string, unknown>>