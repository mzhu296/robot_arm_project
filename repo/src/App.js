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
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import RobotPageWrapper from './components/RobotPageWrapper';
import SoundBar from './subComponents/SoundBar';

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
      case '/blog':
        document.title = 'Blog Page';
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
        <SoundBar />

        {/* Framer-motion animation on page change */}
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/robot" element={<RobotPageWrapper />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
