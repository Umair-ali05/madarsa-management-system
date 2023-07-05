import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';

export const useAuthRedirect = () => {
  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      let data = decodeToken(token);
      if (data.user.role === 'Admin') {
        return window.location.replace('/admin');
      }
      if (data.user.role === 'Teacher') {
        return window.location.replace('/teacher');
      }
      if (data.user.role === 'Student') {
        return window.location.replace('/student');
      }
      return window.location.replace('/login');
    } else {
      window.location.replace('/login');
    }
  }, []);

  return null;
};
