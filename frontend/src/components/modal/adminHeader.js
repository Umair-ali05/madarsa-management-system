import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { useModal } from 'react-hooks-use-modal';
import Toast from '../../utils/utils';
import axios from 'axios';
import './adminHeader.css';

const AdminHeader = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const logout = () => {
    localStorage.removeItem('Authorization');
    close();
    window.location.replace('/login');
  };

  const detail = () => {
    open();
  };

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    const data = decodeToken(token);

    if (data) {
      setName(data.user.name);
      setEmail(data.user.email);
      setRole(data.user.role);
    }
  }, []);

  return (
    <>
      <div>
        {/* Header */}
        <dev className='header'>
          <div className='logo'>
            <img
              src='/images/logo.jpg'
              alt='Logo'
            />
          </div>
          <div className='user-info'>
            <button onClick={detail}>{name}</button>
          </div>
        </dev>
      </div>

      <Modal>
        <div className='modal'>
          <h1>User Details</h1>
          <p
            className='p1'
            id='title'
          >
            Name: {name}
          </p>
          <p
            className='p2'
            id='title'
          >
            Email: {email}
          </p>
          <p
            className='p2'
            id='title'
          >
            Role: {role}
          </p>
          <button onClick={close}>Close</button>
          <button onClick={logout}>Logout</button>
        </div>
      </Modal>
    </>
  );
};

const AddClass = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newClass = {
        name,
        discription: description,
        grade,
      };

      const response = await axios.post(
        'http://localhost:30000/api/class',
        newClass,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        close();
        window.location.replace('/admin/classes');
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
  const openAddClassForm = () => {
    open();
  };

  return (
    <>
      <button onClick={openAddClassForm}>Add Class</button>
      <Modal>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='grade'>Grade:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value=''>Select Grade</option>
                <option value='primary 1st'>1st</option>
                <option value='primary 2nd'>2nd</option>
                <option value='primary 3rd'>3rd</option>
                <option value='intermediate 4th'>4th</option>
                <option value='intermediate 5th'>5th</option>
                <option value='middle 6th'>6th</option>
                <option value='middle 7th'>7th</option>
                <option value='middle 8th'>8th</option>
                <option value='high 9th'>9th</option>
                <option value='high 10th'>10th</option>
              </select>
            </div>
            <div>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type='submit'>Create Class</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

const AddSubject = (id) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // setClassId(id);
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newSubject = {
        name,
        description,
        category,
      };

      const response = await axios.post(
        `http://localhost:30000/api/subject/${id.classId}`,
        newSubject,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        window.location.replace(`/admin/class/${id.classId}`);
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
  const openAddClassForm = () => {
    open();
  };

  return (
    <>
      <button onClick={openAddClassForm}>Add Subject</button>
      <Modal>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>
                Role:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value=''>Select Subject Type</option>
                  <option value='Islamic'>Islamic</option>
                  <option value='Math'>Math</option>
                  <option value='Science'>Science</option>
                  <option value='Urdu'>Urdu</option>
                  <option value='Pakistan-Studies'>Pakistan Studies</option>
                </select>
              </label>
            </div>
            <div>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type='submit'>Create Subject</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

const AssignSubjectToTeacher = (id) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [grade, setGrade] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [subjectId, setSubjectId] = useState('');

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newClass = {
        subjectId: id.subjectId,
        teacherId: selectedTeacher._id,
      };

      const response = await axios.put(
        'http://localhost:30000/api/subject',
        newClass,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (response.data.success) {
        Toast.successToastMessage(response.data.message);
        close();
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

  const searchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:30000/api/user', {
        params: { grade, category },
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (response.data.success) {
        setTeachers(response.data.teachers);
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

  const handleSearchTeachers = () => {
    setTeachers([]);
    setSelectedTeacher(null);
    searchTeachers();
  };

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const openAddClassForm = () => {
    open();
  };

  return (
    <>
      <button onClick={openAddClassForm}>Assign Subject</button>
      <Modal>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='category'>Category:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value=''>Select Grade</option>
                <option value='primaary'>1-3</option>
                <option value='intermediate'>4-5</option>
                <option value='middle'>6-8</option>
                <option value='high'>9-10</option>
              </select>
            </div>
            <div>
              <label htmlFor='grade'>Grade:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select Role</option>
                <option value='Islamic'>Islamic</option>
                <option value='Math'>Math</option>
                <option value='Science'>Science</option>
                <option value='Urdu'>Urdu</option>
                <option value='Pakistan-Studies'>Pakistan Studies</option>
              </select>
            </div>
            {!teachers.length > 0 && (
              <button
                type='button'
                onClick={handleSearchTeachers}
              >
                Search Teachers
              </button>
            )}
            {teachers.length > 0 && (
              <div>
                <label htmlFor='teacher'>Select Teacher:</label>
                <select
                  id='teacher'
                  value={selectedTeacher ? selectedTeacher._id : ''}
                  onChange={(e) =>
                    handleTeacherSelect(
                      teachers.find((teacher) => teacher._id === e.target.value)
                    )
                  }
                >
                  <option value=''>Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option
                      key={teacher._id}
                      value={teacher._id}
                    >
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type='submit'
              disabled={!selectedTeacher}
            >
              Assign Subject
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export { AdminHeader, AddClass, AddSubject, AssignSubjectToTeacher };
