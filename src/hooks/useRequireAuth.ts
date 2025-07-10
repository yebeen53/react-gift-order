import useAuth from '@/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useRequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/homepage/login', {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [user, navigate, location]);

  return user;
};

export default useRequireAuth;
