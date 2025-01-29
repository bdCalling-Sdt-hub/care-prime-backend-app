import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

export const SymptomValidationSchema = z.object({
    body: z.object({
        category: checkValidID("Category is required"),
        tips: z.string().optional(),
        urgent_care_content: z.string({ required_error: "Urgent care content is required" }),
        call_content: z.string({required_error: "Call content is required"})
    })
});