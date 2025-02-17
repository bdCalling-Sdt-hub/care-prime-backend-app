import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiErrors'
import { ICategory } from './category.interface'
import { Category } from './category.model'
import unlinkFile from '../../../shared/unlinkFile'
import QueryBuilder from '../../../shared/QueryBuilder'
import { Symptom } from '../symptom/symptom.model'

const createCategoryToDB = async (payload: ICategory) => {
  const { name, image } = payload;
  const isExistName = await Category.findOne({ name: name })

  if (isExistName) {
    unlinkFile(image);
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "This Category Name Already Exist");
  }

  const createCategory: any = await Category.create(payload)
  if (!createCategory) {
    unlinkFile(image);
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Category')
  }

  return createCategory
}

const getCategoriesFromDB = async (query: Record<string, any>): Promise<{ categories: ICategory[], pagination: any }> => {

  const result = new QueryBuilder(Category.find(), query).paginate().search(["name"]);
  const categories = await result.queryModel.select("name image").lean();

  const newCategories = await Promise.all(categories.map(async (category: any) => {
    const symptom = await Symptom.findOne({ category: category._id });
    return {
      ...category,
      symptom: !!symptom
    }
  }))


  const pagination = await result.getPaginationInfo();
  return { categories: newCategories, pagination };
}

const updateCategoryToDB = async (id: string, payload: ICategory) => {
  const isExistCategory: any = await Category.findById(id);

  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist");
  }

  if (payload.image) {
    unlinkFile(isExistCategory?.image);
  }

  const updateCategory = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return updateCategory
}

const deleteCategoryToDB = async (id: string): Promise<ICategory | null> => {
  const deleteCategory = await Category.findByIdAndDelete(id);
  await Symptom.findOneAndDelete({ category: id });
  if (!deleteCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist")
  }
  return deleteCategory
}

export const CategoryService = {
  createCategoryToDB,
  getCategoriesFromDB,
  updateCategoryToDB,
  deleteCategoryToDB
}
