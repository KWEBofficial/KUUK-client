import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Typography, ThemeProvider, Container, CssBaseline, createTheme, Avatar, Button } from '@mui/material';

import { Poll } from '../../models/poll';
import logo from '../../images/logo192.png';

const defaultTheme = createTheme();

export function GuestLoginPage() {
  const [poll, setPoll] = useState<Poll>({
    id: 1,
    pollName: '뭐먹지',
    createdUser: {
      id: 1,
      firstName: '문',
      lastName: '정민',
      age: 24,
    },
  });
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  async function getPoll() {
    try {
      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/guest/login`);
      if (status === 200) {
        setPoll(response);
      } else {
        throw new Error();
      }
    } catch {
      console.error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getPoll();
  }, []);

  const handleLogin = async (input: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/guest/login`, input);

      if (response.status === 201) {
        window.alert('로그인이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('로그인에 실패했습니다.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Typography variant="h4">KUUK[꾹]</Typography>
          <Box padding="20px">
            <Avatar src={logo} sx={{ width: 76, height: 76 }}></Avatar>
          </Box>
          <Typography variant="h5">{poll?.createdUser.lastName}님의</Typography>
          <Typography variant="h5">{poll?.pollName} 투표에 지금 참여하세요!</Typography>
          <Box paddingTop="30px">
            <Box paddingRight="150px">
              <Button size="small">회원가입 없이 지금 바로 시작하기</Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                id="outlined-basic"
                label="닉네임"
                variant="outlined"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setDisplayName(e.target.value)}
              ></TextField>
              <Box paddingTop="10px" sx={{ width: '100%' }}>
                <Button variant="contained" sx={{ width: '100%' }} onClick={() => handleLogin(displayName)}>
                  투표 참여하기
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
