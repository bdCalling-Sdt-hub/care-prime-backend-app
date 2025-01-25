import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.createBlogToDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog created Successfully',
        data: result,
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.updateBlogInDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog updated Successfully',
        data: result,
    });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.deleteBlogFromDB(req.params.id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog Deleted Successfully',
        data: result,
    });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getBlogsFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog Data Retrieved Successfully',
        data: result,
    });
});

const getBlogDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getBlogDetailsFromDB(req.params.id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog Details Retrieved Successfully',
        data: result,
    });
});


export const BlogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlogDetails
}