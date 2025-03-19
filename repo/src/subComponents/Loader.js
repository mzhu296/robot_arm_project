import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container for centering the spinner
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

// The spinner circle itself
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #ddd;
  border-top: 6px solid #3b82f6; /* Primary color */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

export default Loader;
