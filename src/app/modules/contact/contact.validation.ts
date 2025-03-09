import z from "zod";

export const contactValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).nonempty(),
        phone: z.string({ required_error: "Phone is required" }).nonempty(),
        sort: z.string({ required_error: "Sort is required" })
    })
});