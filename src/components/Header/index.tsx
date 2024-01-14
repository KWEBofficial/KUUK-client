// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import Button component from @mui/material package
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'; // Import AppBar component from @mui/material package
import { Toolbar, Typography } from '@mui/material';

import SideBar from '../Sidebar';

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleButtonClick = () => {
    handleLogin();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KUUK[꾹!]
          </Typography>
          <Typography variant="subtitle1">환영합니다</Typography>
          <Button variant="outlined" color="inherit" onClick={handleButtonClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
