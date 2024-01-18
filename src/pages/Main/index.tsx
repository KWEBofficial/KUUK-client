import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Stack } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
          <Stack sx={{ width: '700px', maxWidth: '1732px' }} spacing={2}>
            <Typography
              fontFamily={'neurimboGothicRegular'}
              textAlign="center"
              variant="h1"
              gutterBottom
              color="primary.dark"
            >
              꾹[KUUK]!
            </Typography>
            <Box
              sx={{
                pl: '21%',
                pr: '21%',
                '& > * + *': {
                  marginTop: 2,
                },
                mb: 2,
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
                  꾹꾹식당은 어때?
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 1,
                  backgroundColor: 'lightgray',
                }}
              >
                <AddCircleOutlineIcon />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    ml: 1,
                    width: '400px',
                    border: '1px solid #ccc',
                    borderRadius: '10pc',
                    backgroundColor: '#fff',
                    spacing: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ width: '280px', flexGrow: 1, ml: 1, color: 'lightgray' }}>
                    그러는 게 좋겠...
                  </Typography>
                  <SentimentSatisfiedAltIcon sx={{ color: 'primary.light' }} />
                  <TagIcon sx={{ color: 'primary.light' }} />
                </Box>
              </Box>
            </Box>
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
              width: '700px',
              maxWidth: '1732px',
            }}
          >
            <Box padding={10}>
              <Typography>
                <span style={{ fontSize: '60pt', fontFamily: 'neurimboGothicRegular' }}>꾹</span>
                <span style={{ fontSize: '25pt' }}>이란?</span>
              </Typography>
              <Typography>꾹은 고려대학교 학생들을 위한 식당 투표 서비스입니다.</Typography>
              <Typography>꾹을 통해 간편한 투표 생성 및 링크 공유를 통한 참여 기능을 체험하세요.</Typography>
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
