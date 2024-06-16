import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { strapiPayments } from '../api/strapi.payments.js';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      strapiPayments(id);

      console.log(id);
    }
  };
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <CardElement />
      <button>Buy</button>
    </form>
  );
};
