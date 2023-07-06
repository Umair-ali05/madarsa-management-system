import '../../home/home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all classes
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/classes');

      if (response.data.success) {
        setClasses(response.data.classes);
      } else {
        setError('Failed to fetch classes');
      }
    } catch (error) {
      setError('Failed to fetch classes');
    }
  };

  const handleAddClass = async () => {
    // Implement your logic to add a new class
    console.log('Add new class');
  };

  return (
    <div>
      <h2>Classes</h2>
      {error && <p>{error}</p>}
      <div className='class-cards'>
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className='class-card'
          >
            <h3>{classItem.name}</h3>
            <p>{classItem.description}</p>
          </div>
        ))}
      </div>
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
};

export default ClassesPage;
