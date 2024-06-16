import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export interface StrapiItem {
  id: string;
  amount: number;
}

@Injectable()
export class StripeService {
  sendPayment = async (strapiItem: StrapiItem) => {
    const payment = await stripe.paymentIntents.create({
      amount: strapiItem.amount,
      description: 'something',
      currency: 'EUR',
      payment_method: strapiItem.id,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      confirm: true,
    });
    console.log(payment);
    return { message: 'Successfull payment' };
  };
}
