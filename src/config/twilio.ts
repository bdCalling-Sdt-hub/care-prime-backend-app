import twilio from 'twilio';
import config from '../config';

const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
export default twilioClient;