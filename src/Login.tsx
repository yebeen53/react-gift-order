import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import type { Theme } from '@/theme';
import { css } from "@emotion/react";
import useCustomTheme from '@/useCustomTheme';
import Button from "@/Button";
import useCustomChange from "@/useCustomChange";
interface LocationState {
  from?: {
    pathName: string;
  };
}

const logContainer = (theme: Theme) => css`
  max-width: 360px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
  color: ${theme.colors.semantic.textDefault};
`;

const logStyle = (theme: Theme, hasError: boolean) => css`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${hasError ? theme.colors.red1000 : theme.colors.semantic.borderDefault};
  border-radius: 6px;
  outline: none;
  &::placeholder {
    color: ${hasError ? theme.colors.red1000 : theme.colors.gray400};
  }
`;
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const theme = useCustomTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathName ?? '/';

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [touchedId, setTouchedId] = useState(false);
  const [touchedPw, setTouchedPw] = useState(false);

  const { setTrue, setFalse } = useCustomChange();

  const isValidId = (value: string) =>{ 
    return value.trim().length > 0 && isValidEmail(value.trim());}
  
  const isValidPw = (value: string) => value.trim().length >= 8;
  const pwError=!pw.trim()
  ?'비밀번호를 입력해주세요'
  :!isValidPw(pw)
  ?'비밀번호는 8글자 이상이어야합니다.'
  :'';
  const handleLogin = () => {
    if (isValidId(id) && isValidPw(pw)) {
      navigate(from, { replace: true });
    } else {
      setTouchedId(true);
      setTouchedPw(true);
    }
  };
  return (
    <div css={logContainer(theme)}>
      <h2 style={{ textAlign: "center" }}>KaKao</h2>

      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onFocus={() => setTrue()}
        onBlur={() => {
          setTouchedId(true);
          setFalse();
        }}
        css={logStyle(theme, touchedId && !isValidId(id))}
      />
      {touchedId && (
  <div style={{ color: theme.colors.red900, fontSize: 12, marginTop: 4 }}>
    {!id.trim()
      ? '아이디를 입력해주세요.'
      : !isValidEmail(id.trim())
      ? '아이디는 이메일 형식으로 입력해주세요.'
      : null}
  </div>
)}
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onFocus={() => setTrue()}
        onBlur={() => {
          setTouchedPw(true);
          setFalse();
        }}
        css={logStyle(theme, touchedPw && !isValidPw(pw))}
      />
      {touchedPw && (
  <div style={{ color: theme.colors.red900, fontSize: 12, marginTop: 4 }}>
    {pwError}
  </div>
)}
      <Button onClick={handleLogin} baseColor={theme.colors.semantic.kakaoYellow}>
        로그인
      </Button>

    </div>
  );
};

export default Login;
