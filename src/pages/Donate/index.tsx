import { Avatar, Box, Typography } from '@mui/material';

import CustomButton from '../../components/CustomButton';

export function DonatePage() {
  return (
    <Box padding={5}>
      <Box marginTop={10} paddingX={10} display={'flex'} justifyContent={'center'}>
        <IntroduceCard imgDir="/dev/Suhyun.jpg" name="김수현" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/Jeongmin.png" name="문정민" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/Bogeon.png" name="박보건" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/Yeonseung.png" name="정연승" roles={['프론트엔드', '백엔드', '디자인']} />
        <IntroduceCard imgDir="/dev/Hyemin.png" name="정혜민" roles={['프론트엔드', '백엔드', '디자인']} />
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
        <a href="https://gift.kakao.com/product/1309987" target="_blank">
          <CustomButton text="후원하기" onClick={() => 1} />
        </a>
      </Box>
    </Box>
  );
}
