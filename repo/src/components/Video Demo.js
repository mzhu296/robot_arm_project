// VideoDemoPage.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Container with a gradient background and centered layout
const VideoDemoContainer = styled.div`
  padding: 3rem;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Header styling with a text shadow for extra depth
const Header = styled.h1`
  color: #1e293b;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  text-align: center;
`;

// Use a grid layout for the video cards
const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

// Video card styling with hover effects and smooth transitions
const VideoCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

// Styled video element with object-fit for proper scaling
const StyledVideo = styled.video`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;

// Caption for each video card
const VideoTitle = styled.p`
  margin: 1rem;
  font-size: 1.1rem;
  color: #334155;
  font-weight: 600;
  text-align: center;
`;

// Back button styling with rounded edges and a scaling hover effect
const BackButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
`;

const VideoDemoPage = () => {
  const navigate = useNavigate();

  return (
    <VideoDemoContainer>
      <Header>Robotic Arm Video Demos</Header>
      <VideoWrapper>
        <VideoCard 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <StyledVideo controls>
            <source src="/videos/IMG_0993.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <VideoTitle>Robotic Arm Operation Demo 1</VideoTitle>
        </VideoCard>
        <VideoCard 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StyledVideo controls>
            <source src="/videos/IMG_1397.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <VideoTitle>Robotic Arm Operation Demo 2</VideoTitle>
        </VideoCard>
      </VideoWrapper>
      <BackButton onClick={() => navigate('/controlPanel')}>
        Return to Control Panel
      </BackButton>
    </VideoDemoContainer>
  );
};

export default VideoDemoPage;
