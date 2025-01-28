import z from "zod";

export const contactValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).nonempty(),
        phone: z.string({ required_error: "Phone is required" }).nonempty(),
        sort: z.number({ required_error: "Sort Number is required" })
    })
});