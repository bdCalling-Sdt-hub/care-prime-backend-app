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
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { sort, ...restPayload } = req.body;

                req.body = { ...restPayload, sort: Number(sort) };
                next();
            } catch (error) {
                res.status(500).json({ message: "Failed to convert String to Number" });
            }
        },
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