import { useNavigate } from 'react-router-dom';
import useAuth from '@/AuthContext';

const useCheckLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
