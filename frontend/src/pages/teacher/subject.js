import '../home/home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TeacherHeader } from '../../components/modal/teacherHeader';
import { AddAssignment } from '../../components/modal/teacherHeader';
import { useLocation } from 'react-router-dom';
import Toast from '../../utils/utils.jsx';

const TeacherSubject = () => {
  const location = useLocation();
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPath = pathParts[pathParts.length - 1];

    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:30000/api/subject/${lastPath}`,
          {
            headers: { Authorization: localStorage.getItem('Authorization') },
          }
        );

        if (response.data.success) {
          Toast.successToastMessage(response.data.message);
          setSubject(response.data.response);
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

    const fetchStudents = async () => {
      try {
        const response = await axios.get('/users');

        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchSubject();
    fetchStudents();
  }, [location.pathname]);

  const handleCreateAssignment = () => {
    // Handle create assignment logic
  };

  const handleMarkAttendance = () => {
    const pathParts = location.pathname.split('/');
    const lastPath = pathParts[pathParts.length - 1];
    window.location.replace(`/teacher/attendance/${lastPath}`);
  };
  const handleMarkResult = () => {
    const pathParts = location.pathname.split('/');
    const lastPath = pathParts[pathParts.length - 1];
    window.location.replace(`/teacher/mark-result/${lastPath}`);
  };

  return (
    <div>
      <TeacherHeader />

      {subject && (
        <div>
          <h2>Subject Details</h2>
          <div>
            <p>Name: {subject.name}</p>
            <p>Description: {subject.description}</p>
          </div>
          <AddAssignment id={subject._id} />
          <button onClick={handleMarkAttendance}>Mark Attendance</button>
          <button onClick={handleMarkResult}>Mark Result</button>
        </div>
      )}

      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* Add more columns as per your requirements */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.role}</td>
              {/* Add more columns as per your requirements */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherSubject;
