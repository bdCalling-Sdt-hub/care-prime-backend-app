import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import sendSMS from "../../../shared/sendSMS";

const insertContactInDB = async (contact: IContact): Promise<IContact> => {

    const existingContact = await Contact.findOne({ sort: contact.sort, user: contact.user });
    if (existingContact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Contact with this sort already exists");
    }

    const newContact = await Contact.create(contact);
    if (!newContact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Error creating contact");
    }
    return await newContact.save();
}

const retrieveContacts = async (user: JwtPayload, query: Record<string, any>): Promise<{ contacts: IContact[], pagination: any }> => {
    const result = new QueryBuilder(Contact.find({ user: user.id }), query).paginate();
    const contacts = await result.queryModel.select("name phone sort").sort({ sort: 1 }).lean();
    const pagination = await result.getPaginationInfo();
    return { contacts, pagination };
}

const updateContactInDB = async (user: JwtPayload, id: string, payload: IContact): Promise<IContact> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Contact ID");
    }

    const contact = await Contact.findByIdAndUpdate(id, payload, { new: true });
    if (!contact) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Failed to update Contact");
    }
    return contact;
}

const deleteContactFromDB = async (id: string): Promise<IContact | null> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Contact ID")
    }

    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!deleteContact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Contact doesn't exist")
    }
    return deleteContact
}

const sendMessageFromDB = async (payload: { id: string, message: string }) => {

    const { id, message } = payload;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Contact ID")
    }

    const contact = await Contact.findById(id).lean();
    if (!contact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Found Contact for Sending Message")
    }

    const send = await sendSMS(contact?.phone, message)
    if (send.invalid) {
        throw new ApiError(StatusCodes.BAD_REQUEST, send.message)
    }
    return send
}


const sendGroupMessageFromDB = async (user: JwtPayload, message: string) => {
    const contacts = await Contact.find({ user: user.id }).lean();

    if (!contacts?.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Found Contact for Sending Message");
    }

    const results = await Promise.allSettled(
        contacts.map(contact => sendSMS(contact?.phone, message))
    );

    const failedMessages = results
        .filter(result => result.status === "fulfilled" && result.value.invalid)
        .map((result, index) => ({
            phone: contacts[index]?.phone,
            message: result.status === "fulfilled" ? result.value.message : "Unknown error"
        }));

    if (failedMessages.length > 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Some messages failed: ${JSON.stringify(failedMessages)}`);
    }

    return "Messages Sent Successfully";
};


export const ContactService = {
    insertContactInDB,
    retrieveContacts,
    updateContactInDB,
    deleteContactFromDB,
    sendMessageFromDB,
    sendGroupMessageFromDB
}