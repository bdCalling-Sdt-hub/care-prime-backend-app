import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IRecord } from "./record.interface";
import { Record } from "./record.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import mongoose, { UpdateWriteOpResult } from "mongoose";

const insertRecordInDB = async (payload: IRecord): Promise<IRecord> => {
    const record = await Record.create(payload);
    if (!record) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Record not created");
    }
    return record;
}

const retrievedRecordsFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{ records: IRecord[], pagination: any }> => {
    const result = new QueryBuilder(Record.find({ user: user.id }), query).paginate();
    const records = await result.queryModel;
    const pagination = result.getPaginationInfo();
    return { records, pagination };
}

const updateRecordInDB = async (id: string, question: any[]): Promise<UpdateWriteOpResult[]> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid record id");
    }

    const isRecordExist = await Record.findById(id).select("questions").lean();
    if (!isRecordExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Record not found");
    }

    const result  = await Promise.all(question.map(({ _id, answer }) =>
        Record.updateOne(
            {
                _id: id,
                "questions._id": _id
            },
            {
                $set: {
                    "questions.$.answer": answer,
                },
            }
        )
    ))

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Record not created");
    }
    return result;
}

export const RecordService = {
    insertRecordInDB,
    retrievedRecordsFromDB,
    updateRecordInDB
}