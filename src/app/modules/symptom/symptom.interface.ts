import { Model, Types } from "mongoose";

export type IContent = {
    name: string;
    content: string;
}

export type ISymptom = {
    _id?:string;
    category: Types.ObjectId;
    tips?:string;
    contents: IContent[];
}

export type SymptomModel = Model<ISymptom, Record<string, any>>