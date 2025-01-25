import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TipsService } from "./tips.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { getSingleFilePath } from "../../../shared/getFilePath";



const createTips = catchAsync(async (req:Request, res:Response) => {

    const image = getSingleFilePath(req.files, "image");
    
    const data = {
        ...req.body,
        image,
    };
  
    const result = await TipsService.createTipsToDB(data);
  
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Tips created successfully",
        data: result,
    });
});
  
const getAllTips = catchAsync(async (req:Request, res:Response) => {

    const result = await TipsService.getAllTipsFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Tips retrieved successfully",
        data: result,
    });
});
  
const updateTips =catchAsync(async (req:Request, res:Response) => {

    const image = getSingleFilePath(req.files, "image");
    const data = {
        ...req.body,
        image,
    };
    const result = await TipsService.updateTipsToDB(req.params.id, data);
  
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Tips updated successfully",
        data: result,
    });
});
  
const deleteTips = catchAsync(async (req:Request, res:Response) => {
    
    const result = await TipsService.deleteTipsToDB(req.params.id);
  
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Tips deleted successfully",
        data: result
    });
});

export const TipsController = {
    createTips,
    getAllTips,
    updateTips,
    deleteTips
}