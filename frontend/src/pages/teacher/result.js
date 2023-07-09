import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../../utils/utils.jsx';
import { useLocation } from 'react-router-dom';

const MarkResultPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [marks, setMarks] = useState('');

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const value = path.split('/')[3];

        const response = await axios.get(
          'http://localhost:30000/api/students',
          {
            headers: { Authorization: localStorage.getItem('Authorization') },
            params: { subjectId: value },
          }
        );

        if (response.data.success) {
          setStudents(response.data.student);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, [path]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = path.split('/')[3];
    try {
      const response = await axios.post(
        'http://localhost:30000/api/result',
        {
          studentId: selectedStudentId,
          subjectId: value,
          marks,
        },
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      if (response.data.success) {
        Toast.successToastMessage('Result marked successfully');
        // Handle success scenario
      } else {
        Toast.errorToastMessage('Failed to mark result');
        // Handle error scenario
      }
    } catch (error) {
      Toast.errorToastMessage('Failed to mark result');
      console.error('Failed to mark result', error);
    }
  };

  return (
    <div>
      <h2>Mark Result</h2>

      <form onSubmit={handleFormSubmit}>
        <label>
          Student:
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option value=''>Select Student</option>
            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Marks:
          <input
            type='text'
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </label>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default MarkResultPage;
