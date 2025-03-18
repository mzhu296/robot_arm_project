// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './components/Themes';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './globalStyles';

// Components
import Main from './components/Main';
import AboutPage from './components/AboutPage';
import ConfigurationPage from './components/ConfigurationPage';
import WorkPage from './components/WorkPage';
import RobotPageWrapper from './components/RobotPageWrapper';
import SoundBar from './subComponents/SoundBar';
import Login from './components/Login';
import Signup from './components/Signup';
import ControlPanel from './components/ControlPanel';
import Settings from './components/Settings';
import Logs from './components/Logs';
import UserManualPage from './components/UserManual';
import DiagnosticPanel from './components/DiagnosticPanel';

function App() {
  const location = useLocation();

  // Dynamically update the page title based on the current route
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Main Page';
        break;
      case '/about':
        document.title = 'About Page';
        break;
      case '/configuration':
        document.title = 'Configuration Page';
        break;
      case '/work':
        document.title = 'Work Page';
        break;
      case '/robot':
        document.title = 'Robot Page';
        break;
      default:
        document.title = 'React Application';
        break;
    }
  }, [location]);

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>


        {/* Framer-motion animation on page change */}
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/robot" element={<RobotPageWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/controlPanel" element={<ControlPanel />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/userManual" element={<UserManualPage />} />
            <Route path="/diagnostics" element={<DiagnosticPanel />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
