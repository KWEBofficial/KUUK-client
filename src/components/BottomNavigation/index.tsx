import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import PollIcon from '@mui/icons-material/Poll';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '10%' }}>
      <BottomNavigation showLabels sx={{ height: '100%', backgroundColor: 'aliceblue' }}>
        <BottomNavigationAction label="내 정보" icon={<AccountCircleIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction
          label="유저 목록"
          icon={<FormatListBulletedIcon />}
          onClick={() => navigate('/list/21')}
        />
        <BottomNavigationAction label="유저 추가" icon={<PersonAddIcon />} onClick={() => navigate('/join')} />
        <BottomNavigationAction label="히스토리" icon={<HistoryIcon />} onClick={() => navigate('/history')} />
        <BottomNavigationAction label="게스트 로그인" icon={<LoginIcon />} onClick={() => navigate('/invite/Ko8y7')} />
        <BottomNavigationAction label="투표 결과" icon={<PollIcon />} onClick={() => navigate('/poll/result/1')} />
      </BottomNavigation>
    </Box>
  );
}
