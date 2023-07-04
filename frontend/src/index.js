/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <ToastContainer />
  </>
);
