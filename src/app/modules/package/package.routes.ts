import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { PackageController } from "./package.controller";
import validateRequest from "../../middlewares/validateRequest";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { CreatePackageZodSchema } from "./package.validation";
const router = express.Router()

router.route("/")
    .post(
        fileUploadHandler(), 
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), 
        validateRequest(CreatePackageZodSchema), 
        PackageController.createPackage
    )
    .get(
        // auth(USER_ROLES.USER, USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        PackageController.getPackage
    )

router.route("/:id")
    .patch(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), PackageController.updatePackage)
    .delete(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), PackageController.deletePackage)

export const PackageRoutes = router;