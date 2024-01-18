import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

import { User } from '../../models/user';
import BirthdateInput from '../../components/BirthdateInput';

export function JoinPage() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    displayName: '',
    password: '',
    birthdate: new Date(),
  });
  const navigate = useNavigate();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;

    setUser({
      ...user,
      [event.target.id]: value,
    });
  }
  const handleBirthdateChange = (birthdate: Date) => {
    setUser({ ...user, birthdate });
  };
  async function handleRegister() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/join`, user, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    } catch (e) {
      toast.error('회원가입에 실패했습니다.');
    }
  }

  /**
   * TextField 컴포넌트는 HTML input 태그를 감싼 컴포넌트입니다.
   * onChange에 함수를 넣어주면, input 태그의 값이 변경될 때마다(한 글자 입력할 때마다) 함수가 실행됩니다.
   * 함수의 이름만 써야 합니다. handleInput() 이렇게 쓰면 안됩니다.
   * handleInput함수에 event 객체를 자동으로 넣어서 실행합니다.
   */
  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원가입</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
          <TextField
            sx={{ width: 406, marginTop: 10 }}
            required
            id="username"
            label="아이디"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="password"
            label="비밀번호"
            type="password"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="displayName"
            label="닉네임"
            onChange={handleInput}
            variant="outlined"
          />
          <BirthdateInput onChange={handleBirthdateChange} />
        </Stack>
      </Box>
      <Box paddingY={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ width: 406, height: 66 }} variant="contained" color="primary" onClick={handleRegister}>
          회원 가입
        </Button>
      </Box>
    </Box>
  );
}
