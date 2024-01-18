import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

import { ResultRestaurant } from '../../models/resultRestaurant';
import CustomButton from '../../components/CustomButton';

export function ResultPage() {
  const [restaurants, setRestaurants] = useState<ResultRestaurant[]>([]);
  const [voteCount, setVoteCount] = useState<number>(0);

  const navigate = useNavigate();
  const { pollId } = useParams();

  async function goToMain() {
    try {
      navigate('/');
    } catch (error) {
      window.alert('메인 페이지로 돌아가지 못 했다');
    }
  }

  async function getResult() {
    try {
      const {
        data: { maxVoteCount, resultRestaurants },
        status,
      } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/result/${pollId}`);
      if (status === 201) {
        setRestaurants(resultRestaurants);
        setVoteCount(maxVoteCount);
      } else {
        throw new Error();
      }
    } catch {
      console.error('투표 결과를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} paddingY={4} gap={4}>
      <Box paddingX={'25%'} sx={{ overflowY: 'auto' }}>
        <Box textAlign={'center'}>
          <Typography
            color="primary.contrastText"
            variant="h5"
            borderRadius={3}
            marginX={'10%'}
            sx={{ backgroundColor: 'primary.main' }}
          >
            당신의 선택! {voteCount}표
          </Typography>
        </Box>
        <Box paddingY={'20px'} width={'100%'}>
          <ImageList variant="masonry" cols={3} gap={20} sx={{ margin: 0 }}>
            {restaurants.map((restaurant) => (
              <ImageListItem key={restaurant.id}>
                <img src={restaurant.imgDir?.replace(/^./, '')} alt={restaurant.restaurantName} loading="lazy" />
                <Typography>{`${restaurant.restaurantName}: ${restaurant.description}`}</Typography>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
      <Box>
        <CustomButton text="메인 페이지로 돌아가기" onClick={goToMain} />
      </Box>
    </Box>
  );
}
