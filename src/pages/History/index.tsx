import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button } from '@mui/material';

import History from '../../models/history';
import logo from '../../images/logo192.png';
import HistoryCard from '../../components/History';

export function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState<History[]>([
    {
      id: 2,
      pollName: '뭐먹지',
      endedAt: new Date(2024, 1, 13),
    },
    {
      id: 3,
      pollName: '이거먹자',
      endedAt: new Date(2024, 1, 15),
    },
  ]);

  async function getHistories() {
    try {
      const { data: historyResponse, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/history`);
      if (status === 200) {
        setHistories(historyResponse);
      } else {
        throw new Error();
      }
    } catch {
      console.error('히스토리 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getHistories();
  }, []);

  return (
    <Box>
      <Box paddingX={3} paddingY={5}>
        <Box paddingX={3} paddingY={3}>
          <Typography variant="h4">히스토리</Typography>
        </Box>
        <Grid container spacing={4} paddingX={3}>
          {histories.map((history) => (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
              <HistoryCard navDir="/" imgDir={logo} pollName={history.pollName} endedAt={history.endedAt} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
        style={{
          position: 'fixed',
          bottom: '16px', // 조정 가능한 값
          right: '16px', // 조정 가능한 값
        }}
        onClick={() => navigate('/')}
      >
        투표 시작하기
      </Button>
    </Box>
  );
}
