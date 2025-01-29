import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { SymptomController } from "./symptom.controller";
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        SymptomController.insertSymptom
    )

router.route('/:id')
    .get(
        SymptomController.symptomDetails
    )


export const SymptomRoutes = router;