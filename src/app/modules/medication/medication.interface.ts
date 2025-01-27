import { Model, Types } from "mongoose";

export type IMedication ={
    _id?: Types.ObjectId;
    image: string;
    name: string;
}
export type MedicationModel = Model<IMedication, Record<string, any>>;