import { Schema, model } from "mongoose";
import { IRecord, RecordModel } from "./record.interface";

const recordSchema = new Schema<IRecord>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    surgeryName: { 
        type: String, 
        required: true 
    },
    bodyArea: { 
        type: String, 
        required: true 
    },
    hospital: { 
        type: String, 
        required: true 
    },
    surgeryDate: { 
        type: Date, 
        required: true 
    },
    complications: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    reports: { 
        type: String, 
        required: true 
    }
});

export const Record = model<IRecord, RecordModel>('Record', recordSchema);