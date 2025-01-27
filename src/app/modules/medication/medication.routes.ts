import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath, getSingleFilePath } from "../../../shared/getFilePath";
import { MedicationController } from "./medication.controller";
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const image = getSingleFilePath(req.files, 'image');

                req.body = {image, ...req.body};
                next();

            } catch (error) {
                res.status(500).json({ message: "Failed to upload image" });
            }
        },
        MedicationController.createMedication
    )
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
        MedicationController.getMedications
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const image = getMultipleFilesPath(req.files, 'image');
                req.body = {image, ...req.body};
                next();

            } catch (error) {
                res.status(500).json({ message: "Failed to upload image" });
            }
        },
        MedicationController.updateMedication
    )
    .delete(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        MedicationController.deleteMedication
    );

export const MedicationRoutes = router;