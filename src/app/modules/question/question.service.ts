import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IQuestion } from "./question.interface";
import { Question } from "./question.model";
import mongoose from "mongoose";

const createQuestionToDB = async (payload: IQuestion[]): Promise<IQuestion[]> => {

    const question = await Question.insertMany(payload);
    if (!question) {
        throw new ApiError( StatusCodes.BAD_REQUEST, "Question not created");
    }
    return question;
}

const getQuestionsFromDB = async (id: string): Promise<IQuestion[]> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError( StatusCodes.BAD_REQUEST, "Invalid campaign id");
    }

    const questions = await Question.find({ medication: id }).select("question type options");
    if (!questions) {
        throw new ApiError( StatusCodes.BAD_REQUEST, "Question not found");
    }
    return questions;
}

export const questionService = {
    createQuestionToDB,
    getQuestionsFromDB
}