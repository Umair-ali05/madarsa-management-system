import '../home/home.css';
import React, { useEffect, useState } from 'react';
import { TeacherHeader } from '../../components/modal/teacherHeader';
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

export const TeacherDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const fetchSubjects = async () => {
    try {
      let token = localStorage.getItem('Authorization');
      token = decodeToken(token);
      console.log(token);
      const teacherId = token.user._id;
      console.log(teacherId);
      const response = await axios.get('http://localhost:30000/api/subjects', {
        params: { teacherId },
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        setSubjects(response.data.response);
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
    fetchSubjects();
  }, []);

  return (
    <>
      <div>
        {/* Dashboard content */}
        <div className='dashboard-content'>
          <TeacherHeader />
          <h2>Teacher Dashboard</h2>
          <div className='dashboard-buttons'>
            <h2>Subjects</h2>
          </div>
          <div className='subject-cards'>
            {subjects.map((subject) => (
              <MDBCard key={subject._id}>
                <Link
                  to={`/teacher/subject/${subject._id}`}
                  className='link'
                >
                  <MDBCardBody>
                    <MDBCardTitle className='c-title'>
                      name: {subject.name}
                    </MDBCardTitle>
                    <MDBCardText className='card-name'>
                      description: {subject.description}
                    </MDBCardText>
                    <MDBCardText className='card-name'>
                      Class: {subject.class}
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
