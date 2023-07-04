/** @format */

import React, { useEffect, useState } from 'react';
import './category.css';
import { category } from '../../assets/data/data';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <MdNavigateNext className='icon' />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <GrFormPrevious className='icon' />
      </button>
    </div>
  );
};
export const Category = () => {
  const [cats, setCat] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:30000/api/category`);

      if (res.data.posts.success) {
        setCat(res.data.posts.post);
      } else {
        console.log(res.data.posts.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(cats);
  useEffect(() => {
    fetchPost();
  }, []);
  const settings = {
    dots: false,
    infinite: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const { search } = useLocation();
  return (
    <>
      {cats.length === 0 ? (
        <div>no record found</div>
      ) : (
        <>
          <section className='category'>
            <div className='content'>
              <Slider {...settings}>
                {cats.map((item) => (
                  <Link to={`/blogs/${item.category}`} className='link'>
                    <div className='boxs'>
                      <div className='box' key={item._id}>
                        <img src={item.categoryImageUrl} alt='cover' />
                        <div className='overlay'>
                          <h4 className='overlay-text'>{item.category}</h4>
                          <p>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </section>
        </>
      )}
    </>
  );
};
