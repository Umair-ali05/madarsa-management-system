import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../../utils/utils.jsx';
import { useParams } from 'react-router-dom';
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

const ViewResultPage = () => {
  const [results, setResults] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:30000/api/result`, {
          headers: { Authorization: localStorage.getItem('Authorization') },
        });
        console.log(response.data.response);
        if (response.data.success) {
          Toast.successToastMessage(response.data.message);
          setResults(response.data.response);
          console.log(results);
        } else {
          Toast.errorToastMessage('Failed to fetch results');
        }
      } catch (error) {
        Toast.errorToastMessage('Failed to fetch results');
        console.error('Failed to fetch results', error);
      }
    };
    console.log(results);
    fetchResults();
  }, [id]);

  return (
    <>
      <div>
        {/* Dashboard content */}
        <div className='dashboard-content'>
          <div className='dashboard-buttons'>
            <h2>Result</h2>
          </div>
          <div className='course-cards'>
            {results.map((assignment) => (
              <MDBCard key={assignment._id}>
                <Link
                  to={`/student/course/${assignment._id}`}
                  className='link'
                >
                  <MDBCardBody>
                    <MDBCardTitle className='c-title'>
                      Name: {assignment.subjectId.name}
                    </MDBCardTitle>
                    <MDBCardText className='card-name'>
                      Marks: {assignment.marks}
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

export default ViewResultPage;
