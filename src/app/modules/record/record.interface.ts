import { Model, Types } from "mongoose"

export type IRecord = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    surgeryName: string;
    bodyArea:string;
    hospital:string;
    surgeryDate: Date;
    complications: string;
    description: string;
    reports: string;
}

export type RecordModel = Model<IRecord, Record<string, unknown>>