import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
import { Layout } from './components/Layout';
import './App.css';
import { AuthProvider } from './components/AuthContent';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
    fontFamily: 'NanumGothic',
  },
  palette: {
    primary: {
      main: '#FEA82F',
      light: '#FFC288',
      dark: '#FA8739',
      contrastText: '#FCECDD',
    },
    secondary: {
      main: '#ffffff',
      light: '#FFC288',
      dark: '#ededed',
      contrastText: '#FEA82F',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <RouteComponent />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
