import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StudentHeader } from '../../components/modal/studentHeader.js';
import Toast from '../../utils/utils.jsx';
import { decodeToken } from 'react-jwt';
import { Link, useHistory } from 'react-router-dom';

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
  const history = useHistory();

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
      if (error.response && error.response.data) {
        Toast.errorToastMessage(error.response.datamessage);
      } else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  const handleViewAssignments = (courseId) => {
    window.location.replace(`/student/assignments/${courseId}`);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div>
        {/* Dashboard content */}
        <div className='dashboard-content'>
          <StudentHeader />
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
                    <MDBBtn onClick={() => handleViewAssignments(course._id)}>
                      View Assignments
                    </MDBBtn>
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
