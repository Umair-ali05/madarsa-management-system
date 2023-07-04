/** @format */

import React, { useState } from 'react';
import { Reply } from './reply';
import { decodeToken } from 'react-jwt';
import { CommentForm } from './commentsFrom';
import './comments.css';

export const Comments = (props) => {
  const [show, setShow] = useState(false);
  let admin = localStorage.getItem('Authorization');
  let mainUser;
  if (admin) {
    mainUser = decodeToken(admin);
  } else {
    mainUser = '';
  }

  return (
    <>
      {props.comments.map((item) => (
        <>
          {!mainUser ? (
            <>
              <div className='main'>
                <div className='item-username'>{item.userName}</div>
                <div className='item-date'>{item.date}</div>
                <div className='item-text'>{item.text}</div>
              </div>
              <div>
                {item.reply.length !== 0 ? <Reply reply={item.reply} /> : <></>}
              </div>
            </>
          ) : (
            <>
              <div className='main'>
                <div className='item-username'>{item.userName}</div>
                <div className='item-date'>{item.date}</div>
                <div className='item-text'>{item.text}</div>
              </div>

              <div className='item-reply-message'>
                {item.reply.length !== 0 ? <Reply reply={item.reply} /> : <></>}
              </div>
              {show && <CommentForm name='reply-comment' _id={item._id} />}
              <button
                className='reply-btn'
                onClick={() => {
                  setShow(true);
                }}
              >
                Reply a comment
              </button>
            </>
          )}
        </>
      ))}
    </>
  );
};
