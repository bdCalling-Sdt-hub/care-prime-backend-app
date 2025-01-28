import { Model, Types } from "mongoose";
import { INPUT_TYPE } from "../../../enums/type";

export type IQuestion = {
    _id?: string;
    medication: Types.ObjectId;
    type: INPUT_TYPE;
    question: string;
}

export type QuestionModel = Model<IQuestion & Record<string, unknown>>;