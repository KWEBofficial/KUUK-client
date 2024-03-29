import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material';

import CustomButton from '../../components/CustomButton';
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
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }, // 요청 header 가 json 타입
      });

      if (response.status === 200) {
        // create
        toast.success('로그인에 성공했습니다!!');
        login();
        navigate('/');
      }
    } catch (e) {
      toast.error('로그인에 실패했습니다!');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h2" fontFamily={'neurimboGothicRegular'} color="primary.dark">
          꾹[KUUK]
        </Typography>
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
      <Stack spacing={2} paddingY={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CustomButton text="로그인" onClick={handleLogin} width={406} height={66} />
        <CustomButton text="회원가입" onClick={() => navigate('/join')} width={406} height={66} />
      </Stack>
    </Box>
  );
}
