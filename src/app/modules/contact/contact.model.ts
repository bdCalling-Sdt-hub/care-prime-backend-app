import { Schema, model } from "mongoose";
import { ContactModel, IContact } from "./contact.interface";

const contactSchema = new Schema<IContact>(
    {
        user: { 
            type: Schema.Types.ObjectId,
            rt: "User", 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        phone: { 
            type: String, 
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Contact = model<IContact, ContactModel>("Contact", contactSchema);