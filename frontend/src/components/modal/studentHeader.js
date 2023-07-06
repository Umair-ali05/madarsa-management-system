import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { useModal } from 'react-hooks-use-modal';

import './adminHeader.css';

const StudentHeader = () => {
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
        <dev className='header'>
          <div className='logo'>
            <img
              src='./logo-removebg-preview.png'
              alt='Logo'
            />
          </div>
          <div className='user-info'>
            <button onClick={detail}>{name}</button>
          </div>
        </dev>
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

export { StudentHeader };
