import '../../home/home.css';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export const SubjectDetailsPage = () => {
  const { subjectId } = useParams();
  const history = useHistory();
  const [subjectDetails, setSubjectDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch subject details
    fetchSubjectDetails();
  }, []);

  const fetchSubjectDetails = async () => {
    try {
      const response = await axios.get(`/subjects/${subjectId}`);

      if (response.data.success) {
        setSubjectDetails(response.data.subjectDetails);
      } else {
        setError('Failed to fetch subject details');
      }
    } catch (error) {
      setError('Failed to fetch subject details');
    }
  };

  const handleEditSubject = () => {
    // Redirect to the edit subject page
    history.push(`/subjects/${subjectId}/edit`);
  };

  const handleDeleteSubject = async () => {
    try {
      const response = await axios.delete(`/subjects/${subjectId}`);

      if (response.data.success) {
        // Subject deleted successfully
        // Redirect to the previous page or any desired page
        history.goBack();
      } else {
        setError('Failed to delete subject');
      }
    } catch (error) {
      setError('Failed to delete subject');
    }
  };

  return (
    <div>
      <h2>Subject Details</h2>
      {error && <p>{error}</p>}
      <div>
        <h3>{subjectDetails.name}</h3>
        <p>{subjectDetails.description}</p>
        <button onClick={handleEditSubject}>Edit Subject</button>
        <button onClick={handleDeleteSubject}>Delete Subject</button>
      </div>
    </div>
  );
};
