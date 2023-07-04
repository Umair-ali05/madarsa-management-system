/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const CommentForm = (props) => {
  const location = useLocation();
  const [comment, setComment] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:30000/api/${props.name}/${props._id}`,
        { text: comment },
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        },
      );
      if (res.data.post.success) {
        window.location.replace(location.pathname);
      }
      //   res.data && window.location.replace('/login');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>Comment *</span>
        <input
          type='text'
          required
          onChange={(e) => setComment(e.target.value)}
        />
        <button type='submit' className='button'>
          Post
        </button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <textarea
            name='comments'
            id='comments'
            onChange={(e) => setComment(e.target.value)}
            style='font-family:sans-serif;font-size:1.2em;'
          >
            Hey... say something!
          </textarea>
        </div>
        <input type='submit' value='Submit' />
      </form> */}
    </>
  );
};
