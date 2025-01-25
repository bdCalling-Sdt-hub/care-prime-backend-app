import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';
import { BlogController } from './blog.controller';
const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(blogValidationSchema),
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BlogController.createBlog
    )
    .get(
        BlogController.getBlogs
    );

router
    .route('/:id')
    .delete(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BlogController.deleteBlog
    )
    .patch(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BlogController.updateBlog
    )
    .get(
        BlogController.getBlogDetails
    );

export const BlogRoutes = router;