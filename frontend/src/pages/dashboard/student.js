import '../home/home.css';
import React, { useEffect, useState } from 'react';
// import { StudentHeader } from '../../components/modal/studentHeader';
import axios from 'axios';
import Toast from '../../utils/utils.jsx';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from 'mdb-react-ui-kit';

export const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('Authorization');

      const response = await axios.get(`http://localhost:30000/api/subjects`, {
        headers: { Authorization: token },
      });

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        setCourses(response.data.response);
      } else {
        Toast.errorToastMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data) {
        Toast.errorToastMessage(error.response.data.message);
      } else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div>
        {/* Dashboard content */}
        <div className='dashboard-content'>
          {/* <StudentHeader /> */}
          <h2>Student Dashboard</h2>
          <div className='dashboard-buttons'>
            <h2>Courses</h2>
          </div>
          <div className='course-cards'>
            {courses.map((course) => (
              <MDBCard key={course._id}>
                <Link
                  to={`/student/course/${course._id}`}
                  className='link'
                >
                  <MDBCardBody>
                    <MDBCardTitle className='c-title'>
                      Name: {course.name}
                    </MDBCardTitle>
                    <MDBCardText className='card-name'>
                      Description: {course.description}
                    </MDBCardText>
                    <MDBCardText className='card-name'>
                      Teacher: {course.teacher}
                    </MDBCardText>
                  </MDBCardBody>
                </Link>
              </MDBCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
