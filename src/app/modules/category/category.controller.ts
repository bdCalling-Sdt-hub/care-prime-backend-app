import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CategoryService } from './category.service'
import { getSingleFilePath } from '../../../shared/getFilePath'

const createCategory = catchAsync(async (req: Request, res: Response) => {

  const image = getSingleFilePath(req.files, 'image');
  const data = {
    ...req.body,
    image,
  };

  const result = await CategoryService.createCategoryToDB(data)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category create successfully',
    data: result,
  })
})

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategoriesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category retrieved successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {

  const image = getSingleFilePath(req.files, 'image');
  const data = {
    ...req.body,
    image,
  };

  const result = await CategoryService.updateCategoryToDB(req.params.id, data)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category updated successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {

  const result = await CategoryService.deleteCategoryToDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category delete successfully',
    data: result,
  })
})


export const CategoryController = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}
