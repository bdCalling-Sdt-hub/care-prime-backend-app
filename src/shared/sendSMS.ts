import config from '../config';
import ApiError from '../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';
import twilioClient from '../config/twilio';

const sendSMS = async (to: string, message: string) => {
    try {
        await twilioClient.messages.create({
            body: message,
            from: config.twilio.twilioNumber,
            to: to,
        });
        return {
            invalid: false,
            message: `Message sent successfully to ${to}`,
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to send sms');
    }
};

export default sendSMS;