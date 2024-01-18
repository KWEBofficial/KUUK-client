import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2024 KUUK. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/term" color="inherit">
            이용 약관
          </Link>
          {' | '}
          <Link href="/privacy" color="inherit">
            개인정보 처리방침
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
