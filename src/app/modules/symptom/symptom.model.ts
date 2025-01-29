import { Schema, model } from "mongoose";
import { ISymptom, SymptomModel } from "./symptom.interface";

const symptomSchema = new Schema<ISymptom>(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            unique: true
        },
        tips: { type: String },
        urgent_care_content: {
            type: String,
            required: true
        },
        call_content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Symptom: SymptomModel = model<ISymptom, SymptomModel>('Symptom', symptomSchema);