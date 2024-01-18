import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

import { PollFormData } from '../../models/pollFormData';
import Candidate from '../../models/candidate';
import VoteBar from '../../components/VoteBar';
import RestaurantCard from '../../components/RestaurantCard';
import CustomButton from '../../components/CustomButton';

export function PollPage() {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [pollFormData, setPollFormData] = useState<PollFormData>({
    poll: {
      id: 1,
      pollName: 'default',
      createdAt: new Date(2001, 1, 1),
      url: 'default-url',
      createdUser: {
        id: 1,
        username: 'defaultuser',
        displayName: 'default',
        password: '1',
        birthdate: new Date(2001, 1, 1),
      },
    },
    candidates: [
      {
        id: 1,
        restaurant: {
          id: 1,
          restaurantName: '식당 이름',
          description: '식당 설명',
        },
      },
    ],
    restaurants: [
      {
        id: 1,
        restaurantName: '식당 이름',
        description: '식당 설명',
        location: {
          id: 1,
          locationName: '위치명',
        },
        categories: [
          {
            id: 1,
            categoryName: '카테고리명',
          },
        ],
        menus: [
          {
            id: 1,
            menuName: '메뉴명',
            price: '22500',
          },
        ],
        imgDir: 'default',
      },
    ],
  });

  // 투표 페이지에 현재 로그인된 유저 displayName 가져오는 함수.
  const getStatus = async () => {
    try {
      const getDisplayName = await axios.get(`${process.env.REACT_APP_API_URL}/user/status`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const currentDisplayName: string = getDisplayName.data.displayName;

      return currentDisplayName;
    } catch (error) {
      return null;
    }
  };
  // 현재 로그인된 유저/게스트의 displayName을 나타내는 state
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const getDisplayName = async () => {
      try {
        const result = await getStatus();
        setDisplayName(result);
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다.');
      }
    };

    getDisplayName();
  }, []);

  // 현재 투표 관련된 정보들을 가져오는 함수
  const getPollFormData = async () => {
    try {
      const { data: pollFormResponse, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/${pollId}`);
      if (status === 200) {
        setPollFormData(pollFormResponse);
      } else {
        throw new Error();
      }
    } catch {
      console.error('투표 정보를 가져오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    getPollFormData();
  }, []);

  const isPollEnded = pollFormData.poll.createdAt !== pollFormData.poll.endedAt;

  // 투표 종료 버튼 클릭 시 실행될 함수 -> 결과 페이지로 이동
  const endPoll = async () => {
    try {
      const endPollResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/poll/end/${pollId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(endPollResponse.data.res);
      if (!endPollResponse.data.res) {
        window.alert('투표를 만든 사람만 종료할 수 있습니다.');
      } else {
        navigate(`/poll/result/${pollId}`);
      }
    } catch (error) {
      window.alert('투표를 만든 사람만 종료할 수 있습니다.');
      console.error('투표 종료에 실패했습니다.');
    }
  };

  const [selectedRestaurants, setSelectedRestaurants] = useState<boolean[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  // 선택한 restaurant index와 같은 index의 candidate를 찾아서 반환
  const getSelectedCandidates = (candidates: Candidate[]) => {
    const selectedIndexes = selectedRestaurants.reduce((acc: number[], isSelected, index) => {
      if (isSelected) {
        acc.push(index);
      }
      return acc;
    }, []);

    const currentSelectedCandidates = candidates.filter((candidate) =>
      selectedIndexes.includes(candidate.restaurant.id),
    );
    console.log(currentSelectedCandidates);
    return currentSelectedCandidates;
  };

  // RestaurantCard에서 선택/해제 시 selectedRestaurants이 변하고, 이에 따라 setSelectedCandidates도 변하도록
  useEffect(() => {
    const result = getSelectedCandidates(pollFormData.candidates);
    console.log(result);
    setSelectedCandidates(result);
  }, [selectedRestaurants]);

  return (
    <Grid container spacing={0} style={{ height: '100vh' }}>
      {/* 좌측 영역 */}
      <Grid item xs={5.9}>
        <Typography display={'flex'} justifyContent="flex-start" variant="h6">
          닉네임 : {displayName}
        </Typography>
        <Typography variant="h6">투표 이름 : {pollFormData?.poll.pollName}</Typography>
        <Typography variant="h6">투표 url : {pollFormData?.poll.url}</Typography>
        <Box display={'flex'} marginTop={3} paddingTop={10} maxHeight={600} overflow={'auto'}>
          <RestaurantCard
            restaurants={pollFormData.restaurants}
            selectedRestaurants={selectedRestaurants}
            setSelectedRestaurants={setSelectedRestaurants}
          />
        </Box>
      </Grid>

      <Grid item xs={0.1} md={0.1}>
        <Box
          sx={{
            height: '80%',
            borderRight: '1px solid orange',
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Grid>

      {/* 우측 영역 */}
      <Grid item xs={5.9}>
        <Box paddingX={8} paddingY={3} justifyContent={'center'} alignItems={'center'}>
          <VoteBar candidates={pollFormData.candidates} selectedCandidates={selectedCandidates} />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {isPollEnded && (
            <CustomButton width={150} text="투표 결과 보기" onClick={() => navigate(`/poll/result/${pollId}`)} />
          )}
          {!isPollEnded && <CustomButton width={150} text="투표 종료" onClick={endPoll} />}
        </Box>
      </Grid>
    </Grid>
  );
}
