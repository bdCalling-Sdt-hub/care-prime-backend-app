import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MedicationService } from './medication.service';

const createMedication = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicationService.createMedicationInDB(req.body)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medication Created successfully',
        data: result
    })
});

const updateMedication = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicationService.updateMedicationInDB(req.params.id, req.body)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medication Updated successfully',
        data: result
    })
});

const getMedications = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicationService.getMedicationsFromDB()
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medication Data Retrieved successfully',
        data: result
    })
});

const deleteMedication = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicationService.deleteMedicationFromDB(req.params.id)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medication Deleted successfully',
        data: result
    })
});

export const MedicationController = {
    createMedication,
    updateMedication,
    getMedications,
    deleteMedication
}