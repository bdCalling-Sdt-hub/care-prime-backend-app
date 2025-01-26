import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RecordService } from './record.service';

const insertRecord = catchAsync(async (req: Request, res: Response) => {
    const result = await RecordService.insertRecordInDB(req.body)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Record Created successfully',
        data: result
    })
})

const retrievedRecords = catchAsync(async (req: Request, res: Response) => {
    const result = await RecordService.retrievedRecordsFromDB(req.user, req.query)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Record Created successfully',
        data: result
    })
})

export const RecordController = {
    insertRecord,
    retrievedRecords
}