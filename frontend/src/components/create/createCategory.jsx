/** @format */

import './create.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';

export const CreateCategory = () => {
  const [category, setCategory] = useState();
  const [file, setFile] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(true);

  const addPost = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:30000/api/category',
        data,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        },
      );

      if (res.data.post.success) {
        setSuccess(res.data.post.message);
        window.location.replace('/');
      } else {
        setError(res.data.post.message);
      }

      // window.location.replace('/post/' + res.data._id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', file);
    data.append('category', category);

    addPost(data);
  };

  return (
    <>
      {!error ? (
        success ? (
          <section className='newPost'>
            <div className='container boxItems'>
              <div className='img '>
                {file && <img src={URL.createObjectURL(file)} alt='images' />}
              </div>
              <form onSubmit={handleSubmit}>
                <div className='inputfile flexCenter'>
                  <div className='upload-file'>
                    <p>Upload Picture</p>
                    <label htmlFor='inputfile'>
                      <IoIosAddCircleOutline />
                    </label>
                  </div>
                  <input
                    type='file'
                    id='inputfile'
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>

                <div className='p-title'>
                  <p>category</p>
                  <input
                    type='text'
                    placeholder='Title'
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <button className='button post-btn'>Create Category</button>
              </form>
            </div>
          </section>
        ) : (
          <div>
            <span>{error}</span>
            <button
              onClick={() => {
                window.location.replace('/create');
              }}
            >
              <h1>ok</h1>
            </button>
          </div>
        )
      ) : (
        <div>
          <span>{error}</span>
          <button
            onClick={() => {
              window.location.replace('/category');
            }}
          >
            <h1>ok</h1>
          </button>
        </div>
      )}
    </>
  );
};
