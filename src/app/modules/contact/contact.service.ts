import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

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
    const contacts = await result.queryModel.select("name phone sort").sort({sort: 1}).lean();
    const pagination =await result.getPaginationInfo();
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

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Contact ID")
    }

    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!deleteContact) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Contact doesn't exist")
    }
    return deleteContact
  }

export const ContactService = {
    insertContactInDB,
    retrieveContacts,
    updateContactInDB,
    deleteContactFromDB
}