import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Stack } from '@mui/material';

import CustomButton from '../../components/CustomButton';
import { CustomBubble } from '../../components/CustomBubble';

export function MainPage() {
  const navigate = useNavigate();

  return (
    /* 스크롤 바 */
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: '650px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
        },
      }}
    >
      {/* 스크롤 바 */}
      <Grid container spacing={0}>
        {/* 좌측 서비스 설명 */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography textAlign="center" variant="h4" gutterBottom paddingTop={3}>
              당신의 선택으로 KUUK[꾹]!
            </Typography>
            <Box
              pl="130px"
              pr="130px"
              sx={{
                '& > * + *': {
                  marginTop: 2,
                },
              }}
            >
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="10%" tailFlip={true}>
                  오늘 뭐 먹어?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <CustomBubble textAlign="right" tailPosition="85%" backgroundColor="primary.light">
                  그러게 뭐 먹지?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="13%" tailFlip={true}>
                  뭐 먹을까?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="15%" tailFlip={true}>
                  몰라?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <CustomBubble textAlign="right" tailPosition="85%" backgroundColor="primary.light">
                  A식당은 어때?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="10%" tailFlip={true}>
                  어제 먹음ㅠ
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <CustomBubble textAlign="right" tailPosition="89%" backgroundColor="primary.light">
                  그냥 우리 밥 먹지 말까?
                </CustomBubble>
              </Box>
            </Box>
            <Typography textAlign="center" variant="h6" gutterBottom>
              선택은 민주주의로! 우리는 배가 고프다!
            </Typography>
            <Typography textAlign="center" variant="h6" gutterBottom>
              간편하게 식당을 고르고 투표방을 만드세요!
            </Typography>
          </Stack>
        </Grid>

        {/* 우측 버튼 두 개 */}
        <Grid item xs={12} md={6}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box padding={10}>
              <Typography marginBottom={1} variant="h3" fontWeight="bold">
                꾹이란?
              </Typography>
              <Typography>
                식당을 고르는 것을 어려워하는 여러분께, 점심 메뉴를 고르다 의 상할 뻔한 당신에게 필요한 서비스 KUUK
              </Typography>
            </Box>
            <Stack spacing={2}>
              <CustomButton text="투표방 생성하기" onClick={() => navigate('/poll')} />
              <CustomButton text="이전 투표 둘러보기" onClick={() => navigate('/history')} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
