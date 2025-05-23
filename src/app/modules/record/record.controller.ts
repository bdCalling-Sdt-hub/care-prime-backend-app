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
        message: 'Medical History Created successfully',
        data: result
    })
})

const retrievedRecords = catchAsync(async (req: Request, res: Response) => {
    const result = await RecordService.retrievedRecordsFromDB(req.user, req.query)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medical History Created successfully',
        data: result.records,
        pagination: result.pagination
    })
})

const updateRecord = catchAsync(async (req: Request, res: Response) => {
    await RecordService.updateRecordInDB(req.body.id, req.body)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medical History Updated successfully'
    })
})

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
    const result = await RecordService.deleteRecordFromDB(req.params.id)
  
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Medical History Deleted successfully',
        data: result
    })
})

export const RecordController = {
    insertRecord,
    retrievedRecords,
    updateRecord,
    deleteRecord
}