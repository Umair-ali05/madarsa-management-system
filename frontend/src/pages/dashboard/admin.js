import React from 'react';
import { AdminHeader } from '../../components/modal/adminHeader';
import './adminDashboard.css';

export const AdminDashboard = () => {
  const classes = () => {
    window.location.replace('/admin/classes');
  };
  const teacher = () => {
    window.location.replace('/admin/teachers');
  };

  return (
    <div>
      <header className='admin-header'>
        <AdminHeader />
      </header>
      <div className='dashboard-content'>
        <h2>Admin Dashboard</h2>
        <div className='dashboard-buttons'>
          <button onClick={classes}>Classes</button>
          <button onClick={teacher}>Teachers</button>
        </div>
      </div>
    </div>
  );
};
