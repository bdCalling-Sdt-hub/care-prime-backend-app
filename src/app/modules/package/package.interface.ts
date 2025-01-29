import { Model } from "mongoose";

export type IPackage = {
    _id?: String;
    title: String;
    description: String;
    features: String[];
    price: Number;
    duration: '1 month' | '3 months' | '6 months' | '1 year';
    productId?: String;
    paymentLink?: string;
    status: 'Active' | 'Delete'
}

export type PackageModel = Model<IPackage, Record<string, unknown>>;