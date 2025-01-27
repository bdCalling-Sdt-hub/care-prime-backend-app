import { z } from "zod";

export const medicationValidationSchema = z.object({
    body: z.object({
        image: z.string({required_error: "Image is Required"}).nonempty(),
        name: z.string({required_error: "Name is Required"}).nonempty()
    })
});