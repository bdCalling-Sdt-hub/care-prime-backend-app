import { Model, Types } from "mongoose"
import { IQuestion } from "../question/question.interface";

export type IRecord = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    medication: Types.ObjectId;
    questions: IQuestion[];
    reports?: string[];
}

interface Question {
    _id: string;
    type: string;
    answer: string;
}
export interface IAnswer {
    _id: string;
    reports?: string[];
    questions: Question[];
    deletedReports: string[];
}

export type RecordModel = Model<IRecord, Record<string, unknown>>