/** @format */

/** @format */

/** @format */

// /** @format */

import React, { useState, useEffect } from 'react';

import '../blog/blogCard.css';
import { GetRating } from '../rating/rating';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from 'mdb-react-ui-kit';

export const SingleCard = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    console.log('i am here');
    setPost(JSON.parse(localStorage.getItem('post')));
    setError(localStorage.getItem('error'));
    localStorage.removeItem('post');
    localStorage.removeItem('error');
  }, []);

  console.log(error);
  console.log(post);

  if (!post) {
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
            <>
              <div className='parent'>
                <button
                  className='card-btn'
                  onClick={() => {
                    window.location.replace(`/blog/${post._id}`);
                  }}
                >
                  <MDBCard>
                    <MDBRipple
                      rippleColor='light'
                      rippleTag='div'
                      className='bg-image hover-overlay'
                    >
                      <MDBCardImage
                        src={post.placeImageUrl}
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
                        Catagory : {post.placeType}
                      </MDBCardTitle>
                      <MDBCardText>
                        <GetRating rating={post} />
                      </MDBCardText>
                      <MDBCardText className='card-name'>
                        Name: {post.placeName}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </button>
              </div>
            </>
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
