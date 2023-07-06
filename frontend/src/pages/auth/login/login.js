import Toast from '../../../utils/utils';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:30000/api/sign-in', {
        email,
        password,
      });

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        localStorage.setItem('Authorization', response.data.response);
        window.location.replace('/');
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
      <h2 id='login' >Login</h2>
      <form id='login-form' onSubmit={handleLogin}>
        <div className='label-container'>
          <label className='login-label'>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='label-container'>
          <label className='login-label'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <div>
        <p>
          Create an account! <Link to='/register'>Sign up</Link>
        </p>
      </div>
    </div>
  );
};
