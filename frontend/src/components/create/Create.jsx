/** @format */

import './create.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const Create = () => {
  const [placeType, setType] = useState('');
  const [placeName, setTitle] = useState('');
  const [placeDescription, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(true);
  const [category, setCategory] = useState([]);
  const location = useLocation();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:30000/api/category`);

      if (res.data.posts.success) {
        setCategory(res.data.posts.post);
      } else {
        console.log(res.data.posts.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addPost = async (data) => {
    try {
      const res = await axios.post('http://localhost:30000/api/blog', data, {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });
      console.log(res.data.post.success);
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
    data.append('placeName', placeName);
    data.append('placeType', placeType);
    data.append('image', file);
    data.append('placeDescription', placeDescription);

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
                  <div className='select'>
                    <p>Select category</p>

                    {category.length === 0 ? (
                      <select>
                        <option value=''>no Category</option>
                      </select>
                    ) : (
                      <>
                        <select
                          value={placeType}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option>select</option>
                          {category.map((category) => (
                            <option
                              key={category._id}
                              value={category.category}
                            >
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
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
                  <p>Title</p>
                  <input
                    type='text'
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='description'>
                  <p>Description</p>
                  <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='10'
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>

                <button className='button post-btn'>Create Post</button>
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
              window.location.replace('/create');
            }}
          >
            <h1>ok</h1>
          </button>
        </div>
      )}
    </>
  );
};
