import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import SalaryInputForm from './components/SalaryInputForm';
import SalaryDisplay from './components/SalaryDisplay';
import Footer from './components/Footer';
import './App.css';

// Create a dark tech theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
    },
    secondary: {
      main: '#ff00ff',
    },
    background: {
      default: '#0c0c0c',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ffff',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
        },
      },
    },
  },
});

// Component for handling user-specific routes
function UserApp() {
  const { username } = useParams();
  const [salaryData, setSalaryData] = React.useState(null);
  const [isRunning, setIsRunning] = React.useState(false);

  const handleStart = (data) => {
    setSalaryData(data);
    setIsRunning(true);
  };

  const handleReset = () => {
    setSalaryData(null);
    setIsRunning(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" className="app-container">
        <Header username={username} />
        {!isRunning ? (
          <SalaryInputForm onStart={handleStart} />
        ) : (
          <SalaryDisplay salaryData={salaryData} onReset={handleReset} />
        )}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

// Main App component with routing
function App() {
  const [salaryData, setSalaryData] = React.useState(null);
  const [isRunning, setIsRunning] = React.useState(false);

  const handleStart = (data) => {
    setSalaryData(data);
    setIsRunning(true);
  };

  const handleReset = () => {
    setSalaryData(null);
    setIsRunning(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" className="app-container">
              <Header />
              {!isRunning ? (
                <SalaryInputForm onStart={handleStart} />
              ) : (
                <SalaryDisplay salaryData={salaryData} onReset={handleReset} />
              )}
              <Footer />
            </Container>
          </ThemeProvider>
        } />
        <Route path="/username/:username" element={<UserApp />} />
      </Routes>
    </Router>
  );
}

export default App;
