import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

import History from '../../models/history';
import HistoryCard from '../../components/History';

export function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState<History[]>([]);

  function checkPollEnd(history: History) {
    return history.poll.createdAt !== history.poll.endedAt;
  }

  async function getHistories() {
    try {
      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/history`, {
        withCredentials: true,
      });
      if (status === 200) {
        setHistories(response);
      } else {
        console.error('히스토리 정보를 가져오는데 실패했습니다.');
        navigate('/');
      }
    } catch (e) {
      console.error('히스토리 정보를 가져오는데 실패했습니다.');
      if (axios.isAxiosError(e)) {
        window.alert(e.response?.data.message);
      }
      navigate('/login');
    }
  }

  useEffect(() => {
    getHistories();
  }, []);

  return (
    <Box>
      <Box paddingX={8} paddingY={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">히스토리</Typography>
        <Fab variant="extended" size="medium" color="primary" onClick={() => navigate('/poll')}>
          <NavigationIcon sx={{ transform: 'rotate(90deg)', mr: 1 }} />
          투표 시작하기
        </Fab>
      </Box>
      {histories.length === 0 && (
        <Box padding="40px">
          <Typography>히스토리가 없습니다!</Typography>
        </Box>
      )}
      <Box paddingX={8} paddingY={2} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Grid container spacing={4} paddingX={3}>
          {histories.map((history) => (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
              <HistoryCard
                navDir="/"
                imgDir={checkPollEnd(history) ? history.resultImgDir : '/logo/투표냥이.png'}
                pollName={history.poll.pollName}
                endedAt={checkPollEnd(history) ? new Date(history.poll.endedAt) : null}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
