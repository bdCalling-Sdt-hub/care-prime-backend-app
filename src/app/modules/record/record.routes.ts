import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import { RecordController } from "./record.controller";
import validateRequest from "../../middlewares/validateRequest";
import { recordValidationSchema } from "./record.validation";
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.USER),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const reports = getMultipleFilesPath(req.files, 'image');

                req.body = {
                    user: req.user.id,
                    reports,
                    ...req.body
                };
                next();

            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Images" });
            }
        },
        validateRequest(recordValidationSchema),
        RecordController.insertRecord
    )
    .patch(
        auth(USER_ROLES.USER),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const reports = getMultipleFilesPath(req.files, 'image');

                req.body = {
                    reports,
                    ...req.body
                };
                next();

            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Images" });
            }
        },
        RecordController.updateRecord
    )
    .get(
        auth(USER_ROLES.USER),
        RecordController.retrievedRecords
    );

export const RecordRoutes = router;