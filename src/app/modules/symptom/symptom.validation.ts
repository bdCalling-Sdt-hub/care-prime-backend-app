import { z } from "zod";
import { checkValidID } from "../../../shared/checkValidID";

const ContentValidationSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    content: z.string().nonempty({ message: "Content is required" })
});

export const SymptomValidationSchema = z.object({
    body: z.object({
        category: checkValidID("Category ID is Required"),
        tips: z.string().optional(),
        contents: z.array(ContentValidationSchema).nonempty({ message: "Contents are required" })
    })
});