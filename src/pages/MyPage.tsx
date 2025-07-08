import useAuth from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const MyPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/homepage/login" replace />;
  }
  const nameFromEmail = user.id.split('@')[0];
  const handleLogout = () => {
    logout();
    navigate('/homepage/login');
  };

  return (
    <div>
      <p>마이 페이지</p>
      <p>{nameFromEmail}님 안녕하세요!</p>
      <p>이메일 주소는 {user.id}입니다.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '24px',
          padding: '10px 20px',
          backgroundColor: '#FEE500',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        로그아웃
      </button>
    </div>
  );
};
export default MyPage;
