import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Fab, Checkbox } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

import History from '../../models/history';
import HistoryCard from '../../components/History';

export function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState<History[]>([]);
  const [selectedHistories, setSelectedHistories] = useState<boolean[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  function initSelection() {
    setSelectedHistories(Array(histories.length).fill(false));
  }

  function setAllHistories(isSelected: boolean) {
    setSelectedHistories(Array(histories.length).fill(isSelected));
  }

  function checkPollEnd(history: History) {
    return history.poll.createdAt !== history.poll.endedAt;
  }

  async function deleteSelectedHistories() {
    try {
      const selectedIndexes = selectedHistories.reduce((acc: number[], isChecked, index) => {
        if (isChecked) {
          acc.push(index);
        }
        return acc;
      }, []);

      const selectedKeys = selectedIndexes.map((index) => histories[index].poll.id);

      const { data: response, status } = await axios.post(
        `${process.env.REACT_APP_API_URL}/poll/delHistory`,
        {
          pollIds: selectedKeys,
        },
        {
          withCredentials: true,
        },
      );
      if (status === 200) {
        toast.success(response);
        window.location.reload();
      }
    } catch (e) {
      console.error('히스토리 정보를 삭제하는데 실패했습니다.');
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    }
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
        toast.error(e.response?.data.message);
      }
      navigate('/login');
    }
  }

  useEffect(() => {
    getHistories();
    initSelection();
  }, []);

  useEffect(() => {
    setAllHistories(isAllSelected);
  }, [isAllSelected]);

  return (
    <Box>
      <Box paddingX={8} paddingY={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">히스토리</Typography>
        <Fab variant="extended" size="medium" color="primary" onClick={() => navigate('/poll')}>
          <NavigationIcon sx={{ transform: 'rotate(90deg)', mr: 1 }} />
          투표 시작하기
        </Fab>
      </Box>
      <Box paddingX={10}>
        {isSelecting ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>모두 선택</Typography>
            <Checkbox checked={isAllSelected} onChange={() => setIsAllSelected(!isAllSelected)}></Checkbox>
            <Fab variant="extended" size="small" color="primary" onClick={() => deleteSelectedHistories()}>
              선택한 히스토리 삭제
            </Fab>
            <Box sx={{ paddingX: '5px' }}></Box>
            <Fab variant="extended" size="small" color="primary" onClick={() => setIsSelecting(false)}>
              선택하기 취소
            </Fab>
          </Box>
        ) : (
          <Fab variant="extended" size="small" color="primary" onClick={() => setIsSelecting(true)}>
            삭제 선택하기
          </Fab>
        )}
      </Box>
      {histories.length === 0 && (
        <Box padding="40px">
          <Typography>히스토리가 없습니다!</Typography>
        </Box>
      )}
      <Box paddingX={8} paddingY={2} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Grid container spacing={4} paddingX={3}>
          {histories.map(
            (history, index) =>
              !history.poll.isDeleted && (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
                  <HistoryCard
                    navDir={checkPollEnd(history) ? `/poll/result/${history.poll.id}` : `/poll/${history.poll.id}`}
                    imgDir={checkPollEnd(history) ? history.resultImgDir : '/logo/투표냥이.png'}
                    pollName={history.poll.pollName}
                    endedAt={checkPollEnd(history) ? new Date(history.poll.endedAt) : null}
                    onSelectionChange={(newState) => {
                      const updatedSelectedHistories = [...selectedHistories];
                      updatedSelectedHistories[index] = newState;
                      setSelectedHistories(updatedSelectedHistories);
                    }}
                    isAllSelected={isAllSelected}
                    isSelecting={isSelecting}
                  />
                </Grid>
              ),
          )}
        </Grid>
      </Box>
    </Box>
  );
}
