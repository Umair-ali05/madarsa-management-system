/** @format */

import React, { useState } from 'react';
import './reply.css';

export const Reply = (props) => {
  return (
    <>
      {props.reply.map((item) => (
        <>
          <div className='main12'>
            <div className='item-username12'>{item.userName}</div>
            <div className='item-date12'>{item.date}</div>
            <div className='item-text12'>{item.text}</div>
          </div>
        </>
      ))}
    </>
  );
};
