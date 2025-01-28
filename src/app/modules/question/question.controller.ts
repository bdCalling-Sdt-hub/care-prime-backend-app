import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { questionService } from "./question.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await questionService.createQuestionToDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Question created successfully",
        data: result
    })
})


const getQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await questionService.getQuestionsFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Question retrieved successfully",
        data: result
    })
})

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await questionService.updateQuestionInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Question retrieved successfully",
        data: result
    })
})

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await questionService.deleteQuestionFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Question retrieved successfully",
        data: result
    })
})

export const questionController = { 
    createQuestion, 
    getQuestion,
    updateQuestion,
    deleteQuestion 
}