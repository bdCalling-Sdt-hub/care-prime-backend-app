import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../shared/QueryBuilder";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const insertContactInDB = async (contact: IContact): Promise<IContact> => {
    const newContact = await Contact.create(contact);
    if(!newContact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Error creating contact");
    }
    return await newContact.save();
}

const retrieveContacts = async (user: JwtPayload, query: Record<string, any>): Promise<{contacts: IContact[], pagination: any}> => {
    const result = new QueryBuilder(Contact.find({user: user.id}), query).paginate();
    const contacts = await result.queryModel;
    const pagination = result.getPaginationInfo();
    return {contacts, pagination};
}

export const contactService = {
    insertContactInDB,
    retrieveContacts
}