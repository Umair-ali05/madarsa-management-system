import { config } from 'dotenv';
import stripe from 'stripe';

config();

export default {
  pay: async (req, res) => {
    const stripeSecretKey = process.env.STRIP_KEY;
    const stripeClient = stripe(stripeSecretKey);
    const { amount, token } = req.body;

    try {
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: 'usd',
        payment_method: token,
        confirm: true,
      });

      // Handle successful payment
      res.status(200).json({ success: true, message: 'Payment successful' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Payment failed' });
    }
  },
};
