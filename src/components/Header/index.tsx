import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button'; // Import Button component from @mui/material package
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'; // Import AppBar component from @mui/material package
import { Toolbar, Typography } from '@mui/material';

import SideBar from '../Sidebar';
import { useAuth } from '../AuthContent';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`);
      window.alert('로그아웃에 성공했습니다');
      logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
    navigate('/'); // 로그아웃 후 홈페이지로 이동
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KUUK[꾹!]
          </Typography>
          <Button variant="outlined" color="inherit" onClick={isLoggedIn ? handleLogout : handleLogin}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
