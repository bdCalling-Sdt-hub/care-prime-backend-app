import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IAnswer, IRecord } from "./record.interface";
import { Record } from "./record.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import mongoose, { UpdateWriteOpResult } from "mongoose";
import unlinkFile from "../../../shared/unlinkFile";

const insertRecordInDB = async (payload: IRecord): Promise<IRecord> => {
    const record = await Record.create(payload);
    if (!record) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Record not created");
    }
    return record;
}

const retrievedRecordsFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{ records: IRecord[], pagination: any }> => {
    const result = new QueryBuilder(Record.find({ user: user.id }), query).paginate();
    const records = await result.queryModel.populate("medication", "name");
    const pagination = await result.getPaginationInfo();
    return { records, pagination };
}

const updateRecordInDB = async (id: string, payload: IAnswer): Promise<null> => {

    const { questions = [], reports = [], deletedReports = [] } = payload;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid record id");
    }


    const record = await Record.findById(id).lean();
    if (!record) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Medical History Found For Update");
    }

    const updatedReports = Array.isArray(deletedReports)
        ? record.reports.filter((report) => !deletedReports.includes(report))
        : record.reports;


    if (Array.isArray(deletedReports)) {
        deletedReports.forEach((report) => unlinkFile(report));
    }

    // Append new reports
    if (Array.isArray(reports) && reports.length > 0) {
        updatedReports.push(...reports);
    }

    const isRecordExist = await Record.findById(id).select("questions").lean();
    if (!isRecordExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Record not found");
    }

    await Record.findByIdAndUpdate(
        { _id: id },
        { $set: { reports: updatedReports.length > 0 ? updatedReports : record?.reports } },
        { new: true }
    );

    const result = await Promise.all(questions?.map(({ _id, answer }) =>
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
    return null;
}

export const RecordService = {
    insertRecordInDB,
    retrievedRecordsFromDB,
    updateRecordInDB
}