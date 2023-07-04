/** @format */

// /** @format */

import React, { useState, useEffect } from 'react';

// import { Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../blog/blogCard.css';
import { GetRating } from '../rating/rating';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from 'mdb-react-ui-kit';

export const Card = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();

  // setp 2
  // const { search } = useLocation();
  const location = useLocation();
  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:30000/api${location.pathname}`,
      );

      if (res.data.posts.success) {
        setPosts(res.data.posts.post);
      } else {
        setError(res.data.posts.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [location.pathname]);

  if (!posts.length) {
    return (
      <div className='no-record'>
        <div className='back-btn'>
          <button
            className='go-back-btn'
            onClick={() => {
              window.location.replace('/');
            }}
          >
            <h1>Back</h1>
          </button>
        </div>
        <div className='no-rec'>
          <span className='no-record-found'>Record not found </span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {!error ? (
          <>
            {posts.map((item) => (
              <>
                <div className='parent'>
                  <button
                    className='card-btn'
                    onClick={() => {
                      window.location.replace(`/blog/${item._id}`);
                    }}
                  >
                    <MDBCard>
                      <MDBRipple
                        rippleColor='light'
                        rippleTag='div'
                        className='bg-image hover-overlay'
                      >
                        <MDBCardImage
                          src={item.placeImageUrl}
                          alt='no image to display'
                          className='image-size'
                        />
                        <a>
                          <div
                            className='mask'
                            style={{
                              backgroundColor: 'rgba(251, 251, 251, 0.15)',
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                      <MDBCardBody>
                        <MDBCardTitle className='c-title'>
                          Catagory : {item.placeType}
                        </MDBCardTitle>
                        <MDBCardText>
                          <GetRating rating={item} />
                        </MDBCardText>
                        <MDBCardText className='card-name'>
                          Name: {item.placeName}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </button>
                </div>
              </>
            ))}
          </>
        ) : (
          <div>
            <span>{error}</span>
            <button
              onClick={() => {
                window.location.replace('/');
              }}
            >
              <h1>ok</h1>
            </button>
          </div>
        )}
      </>
    );
  }
};
