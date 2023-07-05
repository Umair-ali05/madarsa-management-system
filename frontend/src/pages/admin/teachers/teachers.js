import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from '../../../utils/utils.jsx';
import { AdminHeader } from '../../../components/modal/adminHeader';

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

export const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchName, setSearchName] = useState('');

  const fetchTeachers = async () => {
    try {
      const params = {};
      if (selectedGrade) {
        params.grade = selectedGrade;
      }
      if (searchName) {
        params.name = searchName;
      }

      const response = await axios.get('http://localhost:30000/api/users', {
        headers: { Authorization: localStorage.getItem('Authorization') },
        params: params,
      });

      if (response.data.success) {
        setTeachers(response.data.response);
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

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchTeachers();
  };

  return (
    <div>
      <header>
        <AdminHeader />
      </header>

      <h2>Teachers</h2>
      <div>
        <form onSubmit={handleFilterSubmit}>
          <label>
            Grade:
            <select
              value={selectedGrade}
              onChange={handleGradeChange}
            >
              <option value=''>Select Grade</option>
              <option value='primaary'>1-3</option>
              <option value='intermediate'>4-5</option>
              <option value='middle'>6-8</option>
              <option value='high'>9-10</option>
            </select>
          </label>
          <label>
            Name:
            <input
              type='text'
              value={searchName}
              onChange={handleNameChange}
            />
          </label>
          <button type='submit'>Apply Filters</button>
        </form>
      </div>

      <div className='teacher-cards'>
        {teachers.map((teacher) => (
          <MDBCard key={teacher._id}>
            <Link
              to={`/teachers/${teacher._id}`}
              className='link'
            >
              <MDBCardBody>
                <MDBCardTitle>{teacher.name}</MDBCardTitle>
                <MDBCardText>{teacher.email}</MDBCardText>
                <MDBCardText>{teacher.grade}</MDBCardText>
                <MDBCardText>{teacher.category}</MDBCardText>
              </MDBCardBody>
            </Link>
          </MDBCard>
        ))}
      </div>
    </div>
  );
};
