import useRequireAuth from '@/hooks/useRequireAuth';
import theme from '@/data/theme';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import useAuth from '@/context/AuthContext';

const MyPage = () => {
  const user = useRequireAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

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
        css={css`
          margin-top: 24px;
          padding: ${theme.spacing.spacing3} ${theme.spacing.spacing3};
          background-color: ${theme.colors.semantic.kakaoYellow};
          color: ${theme.colors.semantic.textDefault};
          border: none;
          cursor: pointer;
          font-weight: bold;
        `}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
