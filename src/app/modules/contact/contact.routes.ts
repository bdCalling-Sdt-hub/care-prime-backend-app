import express, { NextFunction, Request, Response } from "express";
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user'
import { contactValidationSchema } from './contact.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ContactController } from './contact.controller';
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.USER),
        validateRequest(contactValidationSchema),
        ContactController.insertContact
    )
    .patch(
        auth(USER_ROLES.USER),
        ContactController.sendMessage
    )
    .get(
        auth(USER_ROLES.USER),
        ContactController.retrieveContacts
    );

router.post("/group-message",
    auth(USER_ROLES.USER),
    ContactController.sendGroupMessage
)

router.route('/:id')
    .patch(
        auth(USER_ROLES.USER),
        ContactController.updateContact
    )
    .delete(
        auth(USER_ROLES.USER),
        ContactController.deleteContact
    )

export const ContactRoutes = router;