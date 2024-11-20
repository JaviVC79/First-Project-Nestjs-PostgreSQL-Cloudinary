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
      <CardElement options={{ style: { base: { color: '#32325d', fontFamily: 'Arial, sans-serif', fontSmoothing: 'antialiased', fontSize: '40px', '::placeholder': { color: '#aab7c4', }, }, invalid: { color: '#fa755a', iconColor: '#fa755a', }, }, }} className="p-2 border border-gray-300 rounded-md" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1 h-fit py-1 px-2">Buy</button>
    </form>
  );
};
