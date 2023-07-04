import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddClass, AdminHeader } from '../../../components/modal/adminHeader';
import Toast from '../../../utils/utils.jsx';
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

export const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:30000/api/classes', {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (response.data.success) {
        setClasses(response.data.response);
      } else {
        Toast.errorToastMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  const deleteClass = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:30000/api/class/${id}`,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      if (response.data.success) {
        fetchClasses(); // Refresh classes after successful deletion
        Toast.successToastMessage(response.data.message);
      } else {
        Toast.errorToastMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  return (
    <div>
      <header>
        <AdminHeader />
      </header>

      <h2>Classes</h2>
      <AddClass />
      <div className='class-cards'>
        {classes.map((classItem) => (
          <MDBCard key={classItem._id}>
            <Link
              to={`/admin/class/${classItem._id}`}
              className='link'
            >
              <MDBCardBody>
                <MDBCardTitle className='c-title'>
                  name: {classItem.name}
                </MDBCardTitle>
                <MDBCardText className='card-name'>
                  grade: {classItem.grade}
                </MDBCardText>
                <MDBCardText className='card-name'>
                  description: {classItem.discription}
                </MDBCardText>
              </MDBCardBody>
            </Link>
            <MDBBtn onClick={() => deleteClass(classItem._id)}>
              Delete Class
            </MDBBtn>
          </MDBCard>
        ))}
      </div>
    </div>
  );
};
