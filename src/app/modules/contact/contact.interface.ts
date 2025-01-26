import { Model, Types } from "mongoose";

export type IContact = {
    _id?: number;
    user: Types.ObjectId;
    name: string;
    phone: string;
}

export type ContactModel = Model<IContact, Record<string, unknown>>;