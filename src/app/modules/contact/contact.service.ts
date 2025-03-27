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
    return newContact;
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

    const contact: any = await Contact.findById(id).populate('user', 'name').lean();
    if (!contact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Found Contact for Sending Message")
    }

    const payloadMessage =
        `CarePrime Alert
    ${contact?.user?.name}

    ${message}
    `

    const send = await sendSMS(contact?.phone, payloadMessage)
    if (send.invalid) {
        throw new ApiError(StatusCodes.BAD_REQUEST, send.message)
    }
    return send
}


const sendGroupMessageFromDB = async (user: JwtPayload, message: string) => {
    try {

        const contact: any = await Contact.findOne({ user: user.id }).populate('user', 'name').lean();
        const contacts = await Contact.find({ user: user.id }).lean();

        if (!contacts?.length) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "No Found Contact for Sending Message");
        }

        const payloadMessage =
            `CarePrime Alert
            ${contact?.user?.name}
            ${message}`

        await Promise.all(
            contacts.map(contact => sendSMS(contact?.phone, payloadMessage))
        );

        return "Messages Sent Successfully";
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send group messages");
    }
};


export const ContactService = {
    insertContactInDB,
    retrieveContacts,
    updateContactInDB,
    deleteContactFromDB,
    sendMessageFromDB,
    sendGroupMessageFromDB
}