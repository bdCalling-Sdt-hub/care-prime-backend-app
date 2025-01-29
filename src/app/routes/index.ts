import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { TipsRoutes } from '../modules/tips/tips.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { RecordRoutes } from '../modules/record/record.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { MedicationRoutes } from '../modules/medication/medication.routes';
import { QuestionRoutes } from '../modules/question/question.routes';
import { SubscriptionRoutes } from '../modules/subscription/subscription.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { SymptomRoutes } from '../modules/symptom/symptom.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/tips", route: TipsRoutes },
    { path: "/category", route: CategoryRoutes },
    { path: "/blog", route: BlogRoutes },
    { path: "/record", route: RecordRoutes },
    { path: "/contact", route: ContactRoutes },
    { path: "/medication", route: MedicationRoutes },
    { path: "/question", route: QuestionRoutes },
    { path: "/subscription", route: SubscriptionRoutes },
    { path: "/package", route: PackageRoutes },
    { path: "/symptom", route: SymptomRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;