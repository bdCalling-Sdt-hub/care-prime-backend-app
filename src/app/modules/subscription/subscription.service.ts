import { JwtPayload } from "jsonwebtoken";
import { ISubscription } from "./subscription.interface";
import { Subscription } from "./subscription.model";
import stripe from "../../../config/stripe";
import { User } from "../user/user.model";
import QueryBuilder from "../../../shared/QueryBuilder";


const subscriptionDetailsFromDB = async (user: JwtPayload): Promise<ISubscription | {} > => {

    const subscription = await Subscription.findOne({ user: user.id }).populate("package", "title").lean();
    if (!subscription) {
        return {}; // Return empty object if no subscription found
    }

    const subscriptionFromStripe = await stripe.subscriptions.retrieve(subscription.subscriptionId);

    // Check subscription status and update database accordingly
    if (subscriptionFromStripe?.status !== "active") {
        await Promise.all([
            User.findByIdAndUpdate(user.id, { isSubscribed: false }, { new: true }),
            Subscription.findOneAndUpdate({ user: user.id }, { status: "expired" }, { new: true })
        ]);
    }

    return { subscription };
};

const subscriptionsFromDB = async (query: Record<string, unknown>): Promise<{subscriptions: ISubscription[], pagination:any}> => {

    const result = new QueryBuilder(Subscription.find(), query).paginate();
    const subscriptions = await result.queryModel
        .populate("package", "title")
        .populate("user", "name email profile")
        .select("-createdAt -updatedAt -__v -customerId -subscriptionId")
        .lean();
    const pagination = await result.getPaginationInfo();

    return { subscriptions, pagination };
}

export const SubscriptionService = {
    subscriptionDetailsFromDB,
    subscriptionsFromDB
}