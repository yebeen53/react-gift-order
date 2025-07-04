import { useState } from 'react';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const useLoginForm = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [touchedId, setTouchedId] = useState(false);
  const [touchedPw, setTouchedPw] = useState(false);

  const isValidId = id.trim().length > 0 && isValidEmail(id.trim());
  const isValidPw = pw.trim().length >= 8;
  let idError = '';
  if (!id.trim()) {
    idError = '아이디를 입력해주세요.';
  } else if (!isValidEmail(id.trim())) {
    idError = '아이디는 이메일 형식으로 입력해주세요.';
  } else {
    idError = '';
  }

  let pwError = '';
  if (!pw.trim()) {
    pwError = '비밀번호를 입력해주세요';
  } else if (!isValidPw) {
    pwError = '비밀번호는 8글자 이상이어야 합니다';
  }

  return {
    id,
    pw,
    setId,
    setPw,
    touchedId,
    touchedPw,
    setTouchedId,
    setTouchedPw,
    isValidId,
    isValidPw,
    idError,
    pwError,
  };
};

export default useLoginForm;
