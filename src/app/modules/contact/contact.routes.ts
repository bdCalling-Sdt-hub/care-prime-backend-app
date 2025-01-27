import express from 'express';
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
    .get(
        auth(USER_ROLES.USER),
        ContactController.retrieveContacts
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.USER),
        ContactController.updateContact
    )

export const ContactRoutes = router;