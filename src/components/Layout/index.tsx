import { Box } from '@mui/material';

import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'grey' }}>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          maxWidth: 1728,
          margin: 'auto',
          '@media (max-width: 600px)': {
            maxWidth: '100vw',
          },
        }}
      >
        <Header />
        <Box height="90%" sx={{ backgroundColor: '#ffffff' }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
