import cron from "node-cron";
import { User } from "../app/modules/user/user.model";
import { logger } from "./logger";

export const cronJob = () => {
    const GRACE_PERIOD_MINUTES = 5;

    cron.schedule("* * * * *", async () => { // Runs every minute
        try {
            const cutoffDate = new Date(Date.now() - GRACE_PERIOD_MINUTES * 60 * 1000);

            // Delete unverified accounts older than the grace period
            const result = await User.deleteMany({
                verified: false,
                createdAt: { $lt: cutoffDate }, // Only delete accounts created before the cutoff date
            });

            logger.info(`Deleted ${result.deletedCount} unverified accounts.`);
        } catch (error) {
            logger.error("Error during unverified account cleanup:", error);
        }
    });

    const GRACE_PERIOD_DAY = 7 * 24 * 60;
    cron.schedule("* * * * *", async () => { // Runs every minute
        try {
            const cutoffDay = new Date(Date.now() - GRACE_PERIOD_DAY * 60 * 1000);

            const users = await User.updateMany(
                {
                    isSubscribed: true,
                    trial: true,
                    createdAt: { $lt: cutoffDay }
                },
                {
                    $set: {
                        isSubscribed: false,
                        trial: false
                    }
                },
                {new : true}
            )

            logger.info(`End Trial Period ${users.modifiedCount} Unsubscribed accounts.`);
        } catch (error) {
            logger.error("Error during Trial end account cleanup:", error);
        }
    });



    logger.info("Unverified account cleanup job scheduled to run every minute.");
};