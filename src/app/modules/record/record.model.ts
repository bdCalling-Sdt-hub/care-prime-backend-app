import { Schema, model } from "mongoose";
import { IRecord, RecordModel } from "./record.interface";

const QuestionsSchema = new Schema({
    question: { type: String, required: true },
    type: { type: String, required: true },
    answer: { type: String, required: true }
});

const recordSchema = new Schema<IRecord>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        medication: {
            type: Schema.Types.ObjectId,
            ref: 'Medication',
            required: true
        },
        questions: {
            type: [QuestionsSchema],
            required: true
        },
        reports: [
            {
                type: String,
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Record = model<IRecord, RecordModel>('Record', recordSchema);