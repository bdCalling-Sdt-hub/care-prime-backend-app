import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { TipsRoutes } from '../modules/tips/tips.routes';
import { CategoryRoutes } from '../modules/category/category.route';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/tips", route: TipsRoutes },
    { path: "/category", route: CategoryRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;