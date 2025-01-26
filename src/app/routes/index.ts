import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { TipsRoutes } from '../modules/tips/tips.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { RecordRoutes } from '../modules/record/record.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/tips", route: TipsRoutes },
    { path: "/category", route: CategoryRoutes },
    { path: "/blog", route: BlogRoutes },
    { path: "/record", route: RecordRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;