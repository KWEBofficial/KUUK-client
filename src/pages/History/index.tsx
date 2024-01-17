import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button } from '@mui/material';

import History from '../../models/history';
import HistoryCard from '../../components/History';

export function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState<History[]>([]);

  async function getHistories() {
    try {
      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/history`, {
        withCredentials: true,
      });
      if (status === 200) {
        setHistories(response);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error('히스토리 정보를 가져오는데 실패했습니다.');
      if (axios.isAxiosError(e)) {
        window.alert(e.response?.data.message);
      }
    }
  }

  useEffect(() => {
    getHistories();
  }, []);

  return (
    <Box>
      <Box paddingX={8} paddingY={3}>
        <Typography variant="h4">히스토리</Typography>
      </Box>
      <Box paddingX={8} paddingY={2} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Grid container spacing={4} paddingX={3}>
          {histories.map((history) => (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
              <HistoryCard
                navDir="/"
                imgDir={history.resultImgDir}
                pollName={history.poll.pollName}
                endedAt={new Date(history.poll.endedAt)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        <Button variant="contained" onClick={() => navigate('/')}>
          투표 시작하기
        </Button>
      </Box>
    </Box>
  );
}
