import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Container for the diagnostic panel
const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

// A spinning loader styled as a circular spinner
const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid #e2e8f0;
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

// Styled message for successful diagnostics
const Message = styled(motion.div)`
  font-size: 1.2rem;
  color: #16a085;
  text-align: center;
  padding: 1rem;
`;

const DiagnosticPanel = () => {
  // State to control whether diagnostics are complete.
  const [diagnosed, setDiagnosed] = useState(false);

  useEffect(() => {
    // Simulate diagnostic check delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setDiagnosed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PanelContainer>
      <AnimatePresence>
        {!diagnosed && (
          <Spinner
            key="spinner"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {diagnosed && (
          <Message
            key="message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            No problems detected. Robotic arm is in good working conditions now.
          </Message>
        )}
      </AnimatePresence>
    </PanelContainer>
  );
};

export default DiagnosticPanel;
