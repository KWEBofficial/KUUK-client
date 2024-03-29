import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

export function InvitePage() {
  const { url } = useParams();
  const navigate = useNavigate();

  async function getPoll() {
    try {
      const { status } = await axios.get(`${process.env.REACT_APP_API_URL}/guest/login/${url}`);
      if (status === 200) {
        navigate(`/guest/login/${url}`);
      } else {
        toast.error('투표 정보를 가져오는데 실패했습니다.');
        navigate('/');
      }
    } catch {
      toast.error('투표 정보를 가져오는데 실패했습니다.');
      navigate('/');
    }
  }

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <Box>
      <Typography>투표 정보를 가져오는 중입니다...</Typography>
    </Box>
  );
}
