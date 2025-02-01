import { Visitor } from "./visitor.model";
import { User } from "../user/user.model";
import { Subscription } from "../subscription/subscription.model";
import { Category } from "../category/category.model";

const visitorListFromDB = async (query: Record<string, any>): Promise<{ summary: any, users: any[], visitors: any[] }> => {

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of the next month

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const visitorsArray = Array.from(
        { length: 12 },
        (_, i) => ({
            month: months[i],
            total: 0
        })
    );

    const usersArray = Array.from(
        { length: 12 },
        (_, i) => ({
            month: months[i],
            total: 0
        })
    );

    const visitorsAnalytics = await Visitor.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" }
                },
                total: { $sum: 1 }
            }
        }
    ]);


    const usersAnalytics = await User.aggregate([
        {
            $match:
            {
                role: "USER"
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                },
                total: { $sum: 1 },
            },
        }

    ]);

    // Update visitorsArray with the calculated statistics
    visitorsAnalytics.forEach((stat: any) => {
        const dayIndex = parseInt(stat._id.day) - 1;
        if (dayIndex < visitorsArray.length) {
            visitorsArray[dayIndex].total = stat.total;
        }
    });

    // Update visitorsArray with the calculated statistics
    usersAnalytics.forEach((stat: any) => {
        const dayIndex = parseInt(stat._id.month) - 1;
        if (dayIndex < usersArray.length) {
            usersArray[dayIndex].total = stat.total;
        }
    });


    const [totalEarning, totalUsers, totalSubscriber, totalChapter] = await Promise.all([
        Subscription.aggregate([
            { $match: {} },
            { $group: { _id: null, total: { $sum: "$price" } } },
        ]),
        User.countDocuments({ role: "USER" }),
        Subscription.countDocuments(),
        Category.countDocuments(),
    ])

    const summary = {
        totalEarnings: totalEarning[0]?.total || 0,
        totalUsers,
        totalSubscriber,
        totalChapter
    }

    return { summary, users: usersArray, visitors: visitorsArray }
}

export const VisitorService = { visitorListFromDB }