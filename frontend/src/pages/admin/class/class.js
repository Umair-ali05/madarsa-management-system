import '../../home/home.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Toast from '../../../utils/utils.jsx';
import {
  AddSubject,
  AssignSubjectToTeacher,
} from '../../../components/modal/adminHeader.js';

export const ClassDetailsPage = () => {
  const location = useLocation();
  const [classId, setClassId] = useState('');
  const [classDetails, setClassDetails] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPath = pathParts[pathParts.length - 1];
    setClassId(lastPath);
  }, [location.pathname]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:30000/api/subjects`, {
        params: { classId },
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        setSubjects(response.data.response);
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

  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:30000/api/class/${classId}`,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        setClassDetails(response.data.response);
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

  const deleteSubject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:30000/api/subject/${id}`,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (response.data.success) {
        // Refresh classes after successful deletion
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

  useEffect(() => {
    // Fetch class details and subjects
    fetchClassDetails();
    fetchSubjects();
  }, [classId]);

  return (
    <div>
      <h2>Class Details</h2>
      <div className='class-details' >
        <p>Name: {classDetails.name}</p>
        <p>Grade: {classDetails.grade}</p>
        <p>Discription: {classDetails.description}</p>
      </div>
      <h3 id='subject-details'>Subjects</h3>
      <AddSubject classId={classId} />
      <div className='subject-cards'>
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className='subject-card'
          >
            <h4>Name : {subject.name}</h4>
            <p>Discription: {subject.description}</p>
            <p>Class :{subject.class}</p>
            <p>Teacher: {subject.teacher}</p>
            <AssignSubjectToTeacher subjectId={subject._id} />
            <button onClick={() => deleteSubject(subject._id)}>
              Delete Subject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
