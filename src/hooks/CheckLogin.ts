import { useNavigate } from 'react-router-dom';
import useAuth from '@/context/AuthContext';

const useCheckLogin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const redirectToMyOrLogin = () => {
    if (user) {
      navigate('/my');
    } else {
      navigate('/homepage/login', { state: { from: '/my' } });
    }
  };

  return { redirectToMyOrLogin };
};

export default useCheckLogin;
