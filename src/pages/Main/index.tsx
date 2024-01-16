import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, Stack } from '@mui/material';

import { CustomBubble } from '../../components/customBubble';

export function MainPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {/* 좌측 서비스 설명 */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography textAlign="center" variant="h4" gutterBottom>
              당신의 선택으로 KUUK[꾹]!
            </Typography>
            <Box
              pl="130px"
              pr="130px"
              sx={{
                '& > * + *': {
                  marginTop: 2, // 자식 컴포넌트 간의 상단 마진
                },
              }}
            >
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="10%" tailFlip={true}>
                  오늘 뭐 먹어?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <CustomBubble textAlign="right" tailPosition="85%" backgroundColor="#FFC288">
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
                <CustomBubble textAlign="right" tailPosition="85%" backgroundColor="#FFC288">
                  A식당은 어때?
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-start'}>
                <CustomBubble tailPosition="10%" tailFlip={true}>
                  어제 먹음ㅠ
                </CustomBubble>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <CustomBubble textAlign="right" tailPosition="89%" backgroundColor="#FFC288">
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginBottom: 2 }}
              onClick={() => navigate('/')}
            >
              투표생성하기
            </Button>
            <Button variant="contained" color="secondary" size="large">
              이전 투표 둘러보기
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
