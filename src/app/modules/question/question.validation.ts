import { z } from 'zod';
import { INPUT_TYPE } from '../../../enums/type';

export const QuestionValidationSchema = z.object({
    body: z.array(
        z.object({
            question: z.string({ required_error: "Question is required" }),
            type: z.enum(Object.values(INPUT_TYPE) as [string, ...string[]], {
                required_error: "Type is required",
            }),
        })
    )
});