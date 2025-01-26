import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IRecord } from "./record.interface";
import { Record } from "./record.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

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

export const RecordService = {
    insertRecordInDB,
    retrievedRecordsFromDB
}