import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default {
  successToastMessage: (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  },

  errorToastMessage: (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  },
};
