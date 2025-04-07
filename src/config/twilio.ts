import twilio from 'twilio';
import config from '../config';

const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

twilioClient.api.accounts
  .list()
  .then(accounts => console.log(accounts))
  .catch(error => console.error(error));
export default twilioClient;