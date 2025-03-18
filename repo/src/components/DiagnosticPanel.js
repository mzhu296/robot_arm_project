import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Loader from '../subComponents/Loader'; // Your spinning circles loader component

// Container with a gradient background and refined spacing
const DiagnosticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Title with prominent styling
const Title = styled.h2`
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

// Styled list for diagnostic steps
const ProcessList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 90%;
  max-width: 600px;
  margin: 1rem 0;
`;

// Each step with background, shadow, and a subtle hover effect
const ProcessItem = styled.li`
  margin: 0.75rem 0;
  font-size: 1.1rem;
  color: #334155;
  background: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateX(5px);
  }
`;

// Final message area that fades in when diagnostics complete
const FinalMessage = styled(motion.div)`
  margin-top: 2rem;
  text-align: center;
  color: #16a34a;
  font-weight: bold;
`;

// Return button with modern styling and hover transition
const ReturnButton = styled.button`
  padding: 0.85rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
  margin-top: 1.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transition: background 0.3s ease;

  &:hover {
    background: #2563eb;
  }
`;

const DiagnosticsPanel = () => {
  const navigate = useNavigate();

  // Diagnostic steps to simulate a comprehensive check
  const steps = [
    'Initializing diagnostics engine...',
    'Performing hardware check...',
    'Verifying network connectivity...',
    'Calibrating sensors...',
    'Testing actuator performance...',
    'Analyzing power systems...',
    'Simulating load conditions...',
    'Finalizing diagnostic report...'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [diagnosticsComplete, setDiagnosticsComplete] = useState(false);

  // Simulate each diagnostic step with a 1.5-second delay
  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, steps[currentStepIndex]]);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setDiagnosticsComplete(true);
    }
  }, [currentStepIndex, steps]);

  return (
    <DiagnosticsContainer>
      <Title>Diagnostics Panel</Title>
      <ProcessList>
        {completedSteps.map((step, index) => (
          <ProcessItem key={index}>{step}</ProcessItem>
        ))}
      </ProcessList>

      {/* Show the spinning loader while the diagnostic steps are running */}
      {!diagnosticsComplete && <Loader />}

      {/* Once complete, show a final message and a button to return */}
      {diagnosticsComplete && (
        <FinalMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3>No problems detected.</h3>
          <p>Robotic arm is in good working condition.</p>
          <ReturnButton onClick={() => navigate('/controlPanel')}>
            Return to Control Panel
          </ReturnButton>
        </FinalMessage>
      )}
    </DiagnosticsContainer>
  );
};

export default DiagnosticsPanel;
