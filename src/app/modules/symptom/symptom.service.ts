import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ISymptom } from "./symptom.interface";
import { Symptom } from "./symptom.model";
import mongoose from "mongoose";

const insertSymptomInDB = async (payload: ISymptom): Promise<string>=>{

    const isSymptomExist = await Symptom.exists({category: payload.category});
    if(isSymptomExist){

        await Symptom.findOneAndUpdate(
            {category: payload.category},
            payload,
            {new: true}
        )
        return "Symptom Updated Successfully"
    }

    const symptom = await Symptom.create(payload);
    if(!symptom){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Symptom");
    }

    return "Symptom Created Successfully";
}

const symptomDetailsFromDB = async(id:string): Promise<ISymptom | null>=>{

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Symptom ID");
    }

    const symptom: ISymptom | null = await Symptom.findById(id).lean();
    return symptom;
}

export const SymptomService = {
    insertSymptomInDB,
    symptomDetailsFromDB
}