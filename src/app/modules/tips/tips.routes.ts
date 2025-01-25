import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { TipsController } from "./tips.controller";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), 
        fileUploadHandler(), 
        TipsController.createTips
    )
    .get(
        TipsController.getAllTips
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), 
        fileUploadHandler(), 
        TipsController.updateTips
    )
    .delete(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), 
        TipsController.deleteTips
    );


export const TipsRoutes = router;