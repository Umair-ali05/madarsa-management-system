import React, { useState } from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Toast from '../../../utils/utils';
// import './login.css';

const stripePromise = loadStripe(
  'pk_test_51NRUhyBc1Q8UMlDNYc8VeUSF4wsCgYhkLXhonmCPfl0xy18e2w9x8whtg8sw1hFLsxDD2YUp993oTyhnJGu1PZDg003p4fvXk9'
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Payment method created successfully
      const token = paymentMethod.id;
      try {
        const response = await axios.post(
          'http://localhost:30000/api/payment',
          {
            amount,
            token,
          }
        );
        if (response.data.success) {
          Toast.successToastMessage(response.data.message);
          localStorage.setItem('Authorization', response.data.response);
          window.location.replace('/login');
        } else {
          Toast.errorToastMessage(response.data.message);
        }
      } catch (error) {
        if (error.response.data)
          Toast.errorToastMessage(error.response.data.message);
        else {
          Toast.errorToastMessage(error.message);
        }
      }

      // Send the token to your backend for further processing

      // Clear form fields
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <form onSubmit={handlePayment}>
      <div>
        <h2 id='login'>Payment</h2>
        <input
          type='text'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>
          Card Details
          <CardElement />
        </label>
      </div>
      {error && <div>{error}</div>}
      <button type='submit'>Pay</button>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
