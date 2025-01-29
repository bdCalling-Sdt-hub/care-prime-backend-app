import { Model, Types } from "mongoose"
import { IQuestion } from "../question/question.interface";

export type IRecord = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    medication: Types.ObjectId;
    questions: IQuestion[];
    reports: string[];
}

export type RecordModel = Model<IRecord, Record<string, unknown>>