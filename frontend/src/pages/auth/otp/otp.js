import Toast from '../../../utils/utils';
import React, { useState } from 'react';
import axios from 'axios';
import './otp.css';

export const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:30000/api/verify-otp',
        {
          email,
          otp,
        }
      );

      if (response.data.success) {
        // OTP verified successfully
        Toast.successToastMessage(response.data.message);
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
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:30000/api/resend-otp',
        {
          email,
        }
      );

      if (response.data.success) {
        // OTP verified successfully
        Toast.successToastMessage(response.data.message);
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
  };

  return (
    <div className='container'>
      <h2>OTP Verification</h2>

      <form id='otp-form' onSubmit={handleVerifyOTP}>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          OTP:
          <input
            type='text'
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Verify OTP</button>
      </form>
      <button onClick={handleResendOTP}>Resend OTP</button>
    </div>
  );
};
