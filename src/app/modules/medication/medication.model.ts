import { Schema, model } from "mongoose";
import { IMedication, MedicationModel } from "./medication.interface";

const MedicationSchema = new Schema<IMedication>(
    {
        image: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Medication = model<IMedication, MedicationModel>("Medication", MedicationSchema);