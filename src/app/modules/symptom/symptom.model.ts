import { Schema, model } from "mongoose";
import { IContent, ISymptom, SymptomModel } from "./symptom.interface";

const ContentSchema = new Schema<IContent>({
    name: { type: String, required: true },
    content: { type: String, required: true }
});
 
const SymptomSchema = new Schema<ISymptom>({
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    tips: { type: String },
    contents: { 
        type: [ContentSchema], 
        required: true 
    }
});

export const Symptom: SymptomModel = model<ISymptom, SymptomModel>('Symptom', SymptomSchema);