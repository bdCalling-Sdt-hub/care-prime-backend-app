import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IQuestion } from "./question.interface";
import { Question } from "./question.model";
import mongoose, { UpdateResult } from "mongoose";

const createQuestionToDB = async (payload: IQuestion[]): Promise<IQuestion[]> => {

    const question = await Question.insertMany(payload);
    if (!question) {
        throw new ApiError( StatusCodes.BAD_REQUEST, "Question not created");
    }
    return question;
}

const updateQuestionInDB = async (payload: IQuestion[]): Promise<mongoose.mongo.BulkWriteResult> => {

    const bulkOperations = payload.map((item: IQuestion) => {
        if (item._id && mongoose.Types.ObjectId.isValid(item._id)) {
            return {
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item },
                },
            };
        } else {
            return {
                insertOne: {
                    document: {
                        medication: item.medication,
                        type: item.type,
                        question: item.question,
                    },
                },
            };
        }
    });

    // Perform the bulk write operation
    const result = await Question.bulkWrite(bulkOperations);

    if (result.modifiedCount === 0 && result.insertedCount === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No questions were updated or created");
    }

    return result;
};


const getQuestionsFromDB = async (id: string): Promise<IQuestion[]> => {
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError( StatusCodes.BAD_REQUEST, "Invalid Question id");
    }

    const questions = await Question.find({ medication: id }).select("question type options");
    if (!questions) {
        throw new ApiError( StatusCodes.BAD_REQUEST, "Question not found");
    }
    return questions;
}

const deleteQuestionFromDB = async (id: string): Promise<IQuestion> => {
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError( StatusCodes.BAD_REQUEST, "Invalid Question id");
    }

    const question = await Question.findByIdAndDelete(id);
    if (!question) {
        throw new ApiError( StatusCodes.BAD_REQUEST, "Failed to deleted Question");
    }
    return question;
}

export const questionService = {
    createQuestionToDB,
    getQuestionsFromDB,
    updateQuestionInDB,
    deleteQuestionFromDB
}