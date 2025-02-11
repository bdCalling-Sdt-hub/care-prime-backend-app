import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IPackage } from "./package.interface";
import { Package } from "./package.model";
import mongoose from "mongoose";
import stripe from "../../../config/stripe";
import { createStripeProductCatalog } from "../../../stripe/createStripeProductCatalog";
import { updateStripeProductCatalog } from "../../../stripe/updateStripeProductCatalog";
import { deleteStripeProductCatalog } from "../../../stripe/deleteStripeProductCatalog";

const createPackageToDB = async(payload: IPackage): Promise<IPackage | null>=>{

    const productPayload = {
        title: payload.title,
        description: payload.description,
        duration: payload.duration,
        price: Number(payload.price),
    }
    const product = await createStripeProductCatalog(productPayload);
    

    if(!product){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create subscription product")
    }

    if(product){
        payload.paymentLink = product.paymentLink
        payload.productId = product.productId
    }

    const result = await Package.create(payload);
    if(!result){
        await stripe.products.del(product.productId);
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created Package")
    }

    return result;
}

const updatePackageToDB = async(id: string, payload: IPackage): Promise<IPackage | null>=>{

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID")
    }
    const isExistProduct: IPackage | null = await Package.findById(id).lean();

    if(!isExistProduct){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Package not found")
    }

    if (isExistProduct?.price < payload.price) {
        const payloadData: Record<string, any> = { 
            duration: payload.duration,
            price: Number(payload.price) 
        };
    
        Object.keys(payload).forEach((key) => {
            const typedKey = key as keyof IPackage;
            if (typedKey !== "price" && typedKey !== "duration" && isExistProduct[typedKey] !== payload[typedKey]) {
                payloadData[typedKey] = payload[typedKey];
            }
        });

        const updatedProduct = await updateStripeProductCatalog(isExistProduct.productId as string, payloadData);
        if(!updatedProduct){
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update subscription product")
        }
        payload.paymentLink = updatedProduct
    }

    const result = await Package.findByIdAndUpdate(
        {_id: id},
        payload,
        { new: true } 
    );

    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Update Package")
    }

    return null;
}


const getPackageFromDB = async(): Promise<IPackage[]>=>{
    const result = await Package.find({status: "Active"}).select("-__v -createdAt -updatedAt -status -productId");
    return result;
}

const getPackageDetailsFromDB = async(id: string): Promise<IPackage | null>=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID")
    }
    const result = await Package.findById(id);
    return result;
}

const deletePackageToDB = async(id: string): Promise<IPackage | null>=>{
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID")
    }

    const isExistPackage = await Package.findById(id);
    if(!isExistPackage){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Package not found")
    }

    const deleteProductFromStripe = await deleteStripeProductCatalog(isExistPackage.productId as string);
    if(deleteProductFromStripe.success === false){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to delete subscription product")
    }

    const result = await Package.findByIdAndUpdate(
        {_id: id},
        {status: "Delete"},
        {new: true}
    );

    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to deleted Package")
    }

    return result;
}

export const PackageService = {
    createPackageToDB,
    updatePackageToDB,
    getPackageFromDB,
    getPackageDetailsFromDB,
    deletePackageToDB
}