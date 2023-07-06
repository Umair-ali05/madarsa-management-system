import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from '../../utils/utils.jsx';
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

const AssignmentsPage = ({ match }) => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const courseId = match.params.courseId;
      const token = localStorage.getItem('Authorization');
      console.log(courseId);
      const response = await axios.get(
        `http://localhost:30000/api/assignments/${courseId}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        setAssignments(response.data.response);
      } else {
        Toast.errorToastMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Toast.errorToastMessage(error.response.data.message);
      } else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <>
      <div>
        {/* Dashboard content */}
        <div className='dashboard-content'>
          <div className='dashboard-buttons'>
            <h2>Assignments</h2>
          </div>
          <div className='course-cards'>
            {assignments.map((assignment) => (
              <MDBCard key={assignment._id}>
                <Link
                  to={`/student/course/${assignment._id}`}
                  className='link'
                >
                  <MDBCardBody>
                    <MDBCardTitle className='c-title'>
                      Name: {assignment.title}
                    </MDBCardTitle>
                    <MDBCardText className='card-name'>
                      Description: {assignment.description}
                    </MDBCardText>
                    <MDBCardText className='card-name'>
                      Date: {new Date(assignment.deadline).toLocaleDateString()}
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

export default AssignmentsPage;
