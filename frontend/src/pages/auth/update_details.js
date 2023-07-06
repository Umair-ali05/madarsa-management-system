import '../home/home.css';
import React, { useState } from 'react';
import axios from 'axios';

export const UpdateUserDetails = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/users/${userId}`, {
        name,
        email,
        phoneNumber,
      });

      if (response.data.success) {
        // User details updated successfully
        console.log('User details updated successfully');
      } else {
        setError('Failed to update user details');
      }
    } catch (error) {
      setError('Failed to update user details');
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout', { userId });
    } catch (error) {
      console.log('Failed to logout');
    }
  };

  return (
    <>
      <div>
        <h2>Update User Details</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdateUserDetails}>
          <label>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
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
            Phone Number:
            <input
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <br />
          <button type='submit'>Update</button>
        </form>
      </div>
      <div>
        <h2>Logout</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};
