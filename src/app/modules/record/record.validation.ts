import { z } from "zod";

export const recordValidationSchema = z.object({
    body: z.object({
        user: z.string({ required_error: "User is required" }).nonempty(),
        surgeryName: z.string({ required_error: "Surgery name is required" }).nonempty(),
        bodyArea: z.string({ required_error: "Body area is required" }).nonempty(),
        hospital: z.string({ required_error: "Hospital is required" }).nonempty(),
        surgeryDate: z.date({ required_error: "Surgery date is required" }),
        complications: z.string({ required_error: "Complications are required" }).nonempty(),
        description: z.string({ required_error: "Description is required" }).nonempty(),
        reports: z.string({ required_error: "Reports are required" }).nonempty()
    })
});