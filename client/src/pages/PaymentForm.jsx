import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../Components/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51OqNvYHYclKTCuQMRAWkecWPzA4kaUgEBbI6L4oHH5rIKOOINDMlZCBL0RAmCRP9NRX6g5jrCK0pmYFFq5t7lqU700MtaPVRvN',
);
function PaymentForm() {
  return (
    <div className='py-2'>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
export default PaymentForm;
