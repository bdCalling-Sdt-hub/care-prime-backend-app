import { z } from 'zod';

export const blogValidationSchema = z.object({
    body: z.object({
        image: z.string({required_error: "Image is required"}),
        title: z.string({required_error: "Title is required"}),
        summary: z.string({required_error: "Summary is required"}),
        description: z.string({required_error: "Description is required"}),
        source: z.string().optional(),
    })
});