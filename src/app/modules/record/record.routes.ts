import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import { RecordController } from "./record.controller";
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const reports = getMultipleFilesPath(req.files, 'image');
                const { surgeryDate, ...restPayload } = req.body;

                req.body = {
                    user: req.user.id,
                    ...restPayload,
                    surgeryDate: new Date(surgeryDate),
                    reports
                };
                next();

            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple Question together" });
            }
        },
        RecordController.insertRecord
    )
    .get(
        RecordController.retrievedRecords
    );

export const RecordRoutes = router;