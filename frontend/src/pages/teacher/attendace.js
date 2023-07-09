import '../home/home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TeacherHeader } from '../../components/modal/teacherHeader';
import Toast from '../../utils/utils.jsx';
import { useLocation } from 'react-router-dom';

export const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [date, setDate] = useState('');

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const value = path.split('/')[3];
        setSubjectId(value);

        const response = await axios.get(
          'http://localhost:30000/api/students',
          {
            headers: { Authorization: localStorage.getItem('Authorization') },
            params: { subjectId: value },
          }
        );

        if (response.data.success) {
          setStudents(response.data.student);
          const initialAttendanceData = response.data.student.map(
            (student) => ({
              studentId: student._id,
              present: false,
            })
          );
          setAttendanceData(initialAttendanceData);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, []);

  const handleCheckboxChange = (studentId) => {
    const updatedAttendanceData = attendanceData.map((data) => {
      if (data.studentId === studentId) {
        return {
          studentId,
          present: !data.present,
        };
      }
      return data;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = attendanceData.map((data) => ({
        subjectId,
        date: Date.now(),
        studentId: data.studentId,
        present: data.present,
      }));

      const response = await axios.post(
        'http://localhost:30000/api/mark-attendace',
        payload,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        // Handle success scenario
      } else {
        Toast.errorToastMessage(response.data.message);
        // Handle error scenario
      }
    } catch (error) {
      Toast.errorToastMessage('Failed to mark attendance');
      console.error('Failed to mark attendance', error);
    }
  };

  return (
    <div>
      <TeacherHeader />

      <h2>Mark Attendance</h2>

      <form onSubmit={handleFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      attendanceData.find(
                        (data) => data.studentId === student._id
                      )?.present || false
                    }
                    onChange={() => handleCheckboxChange(student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
