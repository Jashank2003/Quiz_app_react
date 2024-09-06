import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useNavigationBlocking = (message) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isBlocking) {
        event.preventDefault();
        event.returnValue = message; // For some browsers
        return message; // For some browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isBlocking, message]);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (isBlocking) {
        if (window.confirm(message)) {
          setIsBlocking(false);
          navigate(location.pathname); // Navigate to the current path to override the navigation
        } else {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isBlocking, message, navigate, location]);

  return [isBlocking, setIsBlocking];
};

export default useNavigationBlocking;
