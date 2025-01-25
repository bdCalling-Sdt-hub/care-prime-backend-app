import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import unlinkFile from "../../../shared/unlinkFile";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import mongoose from "mongoose";

const createBlogToDB = async (payload: IBlog): Promise<IBlog> => {
    
    const createBlog: any = await Blog.create(payload);
    if (!createBlog) {
        unlinkFile(payload.image);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Blog');
    }

    return createBlog;
};

const deleteBlogFromDB = async (id: string): Promise<IBlog> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Blog Id');
    }

    const category = await Blog.findByIdAndDelete(id);

    if (!category) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Blog not found');
    }

    return category;
};

const updateBlogInDB = async (id: string, payload: IBlog): Promise<IBlog> => {

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Blog Id');
    }

    const isExistBlog: IBlog | null = await Blog.findById(id).select("image");

    if (payload.image && isExistBlog?.image) {
        unlinkFile(isExistBlog?.image);
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "This Blog Name Already Exist");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true });

    if (!updatedBlog) {
        unlinkFile(payload.image);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update Blog');
    }

    return updatedBlog;
};

const getBlogDetailsFromDB = async (id: string): Promise<IBlog> => {


    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Blog Id');
    }


    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Blog not found');
    }

    return blog;
};

const getBlogsFromDB = async (query: Record<string, any>): Promise<IBlog[]> => {

    const blogs = await Blog.find();
    if (!blogs) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No categories found');
    }
    return blogs;
};

export const BlogService = {
    createBlogToDB,
    deleteBlogFromDB,
    updateBlogInDB,
    getBlogDetailsFromDB,
    getBlogsFromDB
};