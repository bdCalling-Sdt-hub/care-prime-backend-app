import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SymptomService } from "./symptom.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const insertSymptom = catchAsync( async (req: Request, res: Response) =>{
    const message = await SymptomService.insertSymptomInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: message
    })
})

const symptomDetails = catchAsync( async (req: Request, res: Response) =>{
    const result = await SymptomService.symptomDetailsFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Symptom Data Retrieved Successfully",
        data: result
    })
})

export const SymptomController = {
    insertSymptom,
    symptomDetails
}