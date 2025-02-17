import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IMedication } from "./medication.interface";
import { Medication } from "./medication.model";
import mongoose from "mongoose";
import unlinkFile from "../../../shared/unlinkFile";
import { Question } from "../question/question.model";

const createMedicationInDB = async (payload: IMedication): Promise<IMedication> => {
    const medication = await Medication.create(payload);
    if(!medication) throw new ApiError(StatusCodes.BAD_REQUEST, "Medication not created");
    return medication;
}

const getMedicationsFromDB = async (): Promise<IMedication[]> => {
    const medications = await Medication.find().select("name image").lean();
    if(!medications) throw new ApiError(StatusCodes.NOT_FOUND, "Medications not found");

    const result = await Promise.all(medications.map(async (medication: IMedication) => { 
        const question = await Question.findOne({ medication: medication._id }).lean();
        return {
            ...medication,
            question: !!question
        }
    }));
    return result;
}

const updateMedicationInDB = async (id: string, payload: IMedication): Promise<IMedication> => {

    if(!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Object Id");

    const isExistMedication = await Medication.findById(id).lean();

    if(payload.image && isExistMedication?.image) {
        unlinkFile(isExistMedication?.image);
    }

    const medication = await Medication.findByIdAndUpdate(id, payload, {new: true});
    if(!medication) throw new ApiError(StatusCodes.NOT_FOUND, "Medication not found");
    return medication;
}

const deleteMedicationFromDB = async (id: string): Promise<IMedication> => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Object Id");
    const medication = await Medication.findByIdAndDelete(id);
    if(!medication) throw new ApiError(StatusCodes.NOT_FOUND, "Medication not found");
    return medication;
}

export const MedicationService = {
    createMedicationInDB,
    getMedicationsFromDB,
    updateMedicationInDB,
    deleteMedicationFromDB
}