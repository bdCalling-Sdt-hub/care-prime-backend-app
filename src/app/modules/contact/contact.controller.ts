import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';

const insertContact = catchAsync(async (req: Request, res: Response) => {
    const payload = {
        user: req.user.id,
        ...req.body
    }
    const result = await ContactService.insertContactInDB(payload);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact Created Successfully',
        data: result
    });
});

const retrieveContacts = catchAsync(async (req: Request, res: Response) => {

    const result = await ContactService.retrieveContacts(req.user, req.query);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact Data retrieved Successfully',
        data: result
    });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {

    const result = await ContactService.updateContactInDB(req.user, req.params.id, req.body);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact updated Successfully',
        data: result
    });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {

    const result = await ContactService.deleteContactFromDB(req.params.id);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Contact deleted Successfully',
        data: result
    });
});


export const ContactController = {
    insertContact,
    retrieveContacts,
    updateContact,
    deleteContact
};