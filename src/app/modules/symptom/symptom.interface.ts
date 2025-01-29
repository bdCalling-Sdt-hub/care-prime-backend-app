import { Model, Types } from "mongoose";

export type ISymptom = {
    _id?:string;
    category: Types.ObjectId;
    tips?:string;
    urgent_care_content: string;
    call_content: string;
}

export type SymptomModel = Model<ISymptom, Record<string, any>>