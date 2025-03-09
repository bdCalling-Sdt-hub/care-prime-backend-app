import { Model, Types } from "mongoose";

export type IContact = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    name: string;
    phone: string;
    sort: string;
}

export type ContactModel = Model<IContact, Record<string, unknown>>;