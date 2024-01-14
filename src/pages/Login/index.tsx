import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

import { useAuth } from '../../components/AuthContent';

export function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  async function handleLogin() {
    try {
      // Join post user/login
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, inputs, {
        headers: {
          'Content-Type': 'application/json',
        }, // 요청 header 가 json 타입
      });

      if (response.status === 200) {
        // create
        window.alert('로그인이 완료되었습니다.');
        login();
        navigate('/');
      }
    } catch (e) {
      window.alert('로그인에 실패했습니다.');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">KUUK[꾹]</Typography>
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
        </Stack>
      </Box>
      <Box paddingY={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ width: 406, height: 66 }} variant="contained" color="primary" onClick={handleLogin}>
          로그인
        </Button>
      </Box>
    </Box>
  );
}
