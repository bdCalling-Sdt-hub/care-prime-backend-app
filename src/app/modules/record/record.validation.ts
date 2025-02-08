import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const QuestionsValidationSchema = z.object({
    question: z.string({ required_error: "Question is required" }).nonempty(),
    type: z.string({ required_error: "Type is required" }).nonempty(),
    answer: z.string({ required_error: "Answer is required" }).nonempty()
});

export const recordValidationSchema = z.object({
    body: z.object({
        medication: checkValidID("Medication ID is Required"),
        questions: z.array(QuestionsValidationSchema),
        reports: z.array(z.string({ required_error: "Report Image is Required" }).nonempty())
    })
});