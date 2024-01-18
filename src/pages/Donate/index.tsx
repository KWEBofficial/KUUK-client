import { Avatar, Box, Typography } from '@mui/material';

export function DonatePage() {
  return (
    <Box padding={5}>
      <Box marginTop={10} paddingX={10} display={'flex'} justifyContent={'center'}>
        <IntroduceCard imgDir="/dev/1.jpg" name="김수현" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/2.jpg" name="문정민" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/3.jpg" name="박보건" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/4.jpg" name="정연승" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/5.jpg" name="정혜민" roles={['프론트엔드', '백엔드', '디자인']} />
      </Box>
    </Box>
  );
}

interface IntroduceCardProps {
  imgDir: string;
  name: string;
  roles: string[];
}

function IntroduceCard({ imgDir, name, roles }: IntroduceCardProps) {
  return (
    <Box width={'20%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Avatar alt={name} src={imgDir} sx={{ width: 120, height: 120 }} />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'} height={'70px'}>
        <Typography variant="h6" align="center">
          {name}
        </Typography>
      </Box>
      <Box
        paddingX={1}
        display={'flex'}
        justifyContent={'center'}
        flexWrap={'wrap'}
        gap={2}
        sx={{ backgroundColor: 'white' }}
      >
        {roles.map((role) => (
          <Typography
            padding={'6px'}
            paddingX={'12px'}
            display="inline"
            align="center"
            borderRadius={8}
            sx={{ backgroundColor: 'primary.light' }}
          >
            {role}
          </Typography>
        ))}
      </Box>
      <Box marginY={4}>
        <a href="https://gift.kakao.com/product/5417137" target="_blank">
          <button>후원하기</button>
        </a>
      </Box>
    </Box>
  );
}
