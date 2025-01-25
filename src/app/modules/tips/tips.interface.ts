import { Model, Types } from "mongoose";

export type ITips = {
    _id?: Types.ObjectId;
    name: string;
    image: string;
}

export type TipsModel = Model<ITips>;