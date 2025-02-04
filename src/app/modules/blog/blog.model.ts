import { Schema, model } from "mongoose";
import { BlogModel, IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog, BlogModel>(
    {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        source: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);