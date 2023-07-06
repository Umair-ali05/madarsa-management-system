import Toast from '../../../utils/utils';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './registration.css';

export const Registration = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [grade, setGrade] = useState('');
  const [category, setCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        name,
        password,
        email,
        role,
        grade: role === 'Teacher' || 'Student' ? grade : '',
        category: role === 'Teacher' ? category : '',
      };

      const response = await axios.post(
        'http://localhost:30000/api/sign-up',
        user
      );
      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        window.location.replace('/otp');
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
    <div className='registration-container'>
      <h2 id='signup'>Sign Up</h2>

      <form id='registration-form' onSubmit={handleSubmit}>
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
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value=''>Select Role</option>
            <option value='Teacher'>Teacher</option>
            <option value='Admin'>Admin</option>
            <option value='Student'>Student</option>
          </select>
        </label>
        <br />
        {role === 'Student' && (
          <label>
            Grade:
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value=''>Select Grade</option>
              <option value='primary 1st'>1st</option>
              <option value='primary 2nd'>2nd</option>
              <option value='primary 3rd'>3rd</option>
              <option value='intermediate 4th'>4th</option>
              <option value='intermediate 5th'>5th</option>
              <option value='middle 6th'>6th</option>
              <option value='middle 7th'>7th</option>
              <option value='middle 8th'>8th</option>
              <option value='high 9th'>9th</option>
              <option value='high 10th'>10th</option>
            </select>
          </label>
        )}
        <br />
        {role === 'Teacher' && (
          <>
            <label>
              Grade:
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value=''>Select Role</option>
                <option value='primaary'>1-3</option>
                <option value='intermediate'>4-5</option>
                <option value='middle'>6-8</option>
                <option value='high'>9-10</option>
              </select>
            </label>
            <br />
            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select Role</option>
                <option value='Islamic'>Islamic</option>
                <option value='Math'>Math</option>
                <option value='Science'>Science</option>
                <option value='Urdu'>Urdu</option>
                <option value='Pakistan-Studies'>Pakistan Studies</option>
              </select>
            </label>
            <br />
          </>
        )}
        <button type='submit'>Sign Up</button>
      </form>
      <div>
        <p>
          Already have an account! <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};
