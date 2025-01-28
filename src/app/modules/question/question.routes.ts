import express, { NextFunction, Request, Response } from "express";
import { questionController } from "./question.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { QuestionValidationSchema } from "./question.validation";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { questions, medication } = req.body;

                if (Array.isArray(questions)) {
                    req.body = questions.map((question) => {
                        return {
                            ...question,
                            medication
                        }
                    });
                }
                next();
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple Question together" });
            }
        },
        validateRequest(QuestionValidationSchema),
        questionController.createQuestion
    )
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { questions } = req.body;
                req.body = questions;
                next();
            } catch (error) {
                res.status(500).json({ message: "Need Array to insert Multiple Question together" });
            }
        },
        questionController.updateQuestion
    )

router.route("/:id")
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
        questionController.getQuestion
    )
    .delete(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        questionController.deleteQuestion
    )
export const QuestionRoutes = router;