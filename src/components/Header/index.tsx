import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button'; // Import Button component from @mui/material package
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'; // Import AppBar component from @mui/material package
import { Toolbar } from '@mui/material';

import SideBar from '../Sidebar';
import { useAuth } from '../AuthContent';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  async function handleLogout() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        window.alert('로그아웃이 완료되었습니다.');
        logout();
        navigate('/');
      }
    } catch (error) {
      window.alert('로그아웃에 실패했습니다.');
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary' }}>
        <Toolbar>
          <SideBar />
          <Button
            disableElevation
            onClick={() => navigate('/')}
            sx={{
              backgroundImage: 'url("/logo/logoKor.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '30px',
              marginRight: 'auto',
            }}
          ></Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={isLoggedIn ? handleLogout : handleLogin}
            sx={{ marginLeft: 'auto' }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
