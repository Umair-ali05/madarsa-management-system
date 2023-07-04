import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { useModal } from 'react-hooks-use-modal';
import Toast from '../../utils/utils';
import axios from 'axios';

const TeacherHeader = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const logout = () => {
    localStorage.removeItem('Authorization');
    close();
    window.location.replace('/login');
  };

  const detail = () => {
    open();
  };

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    const data = decodeToken(token);

    if (data) {
      setName(data.user.name);
      setEmail(data.user.email);
      setRole(data.user.role);
    }
  }, []);

  return (
    <>
      <div>
        {/* Header */}
        <header>
          <div className='logo'>
            {/* Replace with your logo */}
            <img
              src='/path/to/logo.png'
              alt='Logo'
            />
          </div>
          <div className='user-info'>
            <button onClick={detail}>{name}</button>
          </div>
        </header>
      </div>

      <Modal>
        <div className='modal'>
          <h1>User Details</h1>
          <p
            className='p1'
            id='title'
          >
            Name: {name}
          </p>
          <p
            className='p2'
            id='title'
          >
            Email: {email}
          </p>
          <p
            className='p2'
            id='title'
          >
            Role: {role}
          </p>
          <button onClick={close}>Close</button>
          <button onClick={logout}>Logout</button>
        </div>
      </Modal>
    </>
  );
};

const AddAssignment = (id) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedDate = new Date(deadline).getTime(); // Convert selected date to milliseconds
      const newAssignment = {
        title,
        description,
        deadline: selectedDate, // Pass the selected date in milliseconds
        subject: `${id.id}`,
      };

      const response = await axios.post(
        `http://localhost:30000/api/assignment`,
        newAssignment,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        close();
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

  const openAddAssignmentForm = () => {
    open();
  };

  return (
    <>
      <button onClick={openAddAssignmentForm}>Add assignment</button>
      <Modal>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='name'>Title:</label>
              <input
                type='text'
                id='name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor='date'>Date:</label>
              <input
                type='date'
                id='date'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <button type='submit'>Create Subject</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export { TeacherHeader, AddAssignment };
