import { toast } from 'react-toastify';

const showToast = (props) => {
  const { message, type = 'success', position = 'top-right', autoClose = 2000, hideProgressBar = false, closeOnClick = true, pauseOnHover = true, draggable = true }=props;
  const toastOptions = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
   progress:props?.progress,
  };

  if (type === 'success') {
    toast.success(message, toastOptions);
  } else if (type === 'error') {
    toast.error(message, toastOptions);
  } else {
    toast(message, toastOptions); 
  }
};

export default showToast;