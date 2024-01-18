import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Typography, Avatar, Button } from '@mui/material';

import { Poll } from '../../models/poll';

export function GuestLoginPage() {
  const { url } = useParams();
  const [poll, setPoll] = useState<Poll>();
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  async function getPoll() {
    try {
      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/guest/login/${url}`, {
        withCredentials: true,
      });
      if (status === 200) {
        setPoll(response);
        if (response.createdAt !== response.endedAt) {
          toast.error('투표가 종료되었습니다.');
          navigate(`/poll/result/${response.id}`);
        }
      } else {
        toast.error('투표 정보를 가져오는데 실패했습니다.');
        navigate('/');
      }
    } catch (e) {
      toast.error('투표 정보를 가져오는데 실패했습니다.');
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
      navigate('/');
    }
  }

  useEffect(() => {
    getPoll();
  }, []);

  async function handleLogin(input: string) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/guest/login`,
        { displayName: input },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        toast.error('로그인이 완료되었습니다.');
        navigate(`/poll/${poll?.id}`);
      }
    } catch (e) {
      toast.error('로그인에 실패했습니다.');
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography fontSize="50pt" fontFamily="neurimboGothicRegular" color="primary">
        꾹[KUUK]!
      </Typography>
      <Box padding="20px">
        <Avatar src={'/images/don.png'} sx={{ width: 76, height: 76 }}></Avatar>
      </Box>
      <Typography variant="h5">{poll?.createdUser.displayName} 님의</Typography>
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
  );
}
