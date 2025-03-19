import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ============ Styled Components ============

const ManualContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  color: #2c3e50;
`;

const Subtitle = styled.p`
  text-align: center;
  font-style: italic;
  margin-bottom: 2rem;
  color: #7f8c8d;
`;

const TableOfContents = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #ecf0f1;
`;

const TOCItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #bdc3c7;
  }
`;

const AccordionSectionContainer = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
`;

const AccordionHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #34495e;
  padding: 0.5rem 0;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  color: #2c3e50;
  margin-top: 0.5rem;
`;

const Paragraph = styled.p`
  margin: 0.75rem 0;
`;

const List = styled.ul`
  margin-left: 1.5rem;
  list-style: disc;
  margin-bottom: 0.75rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 0.5rem;
  background: #f1f1f1;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

const Chevron = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  transform: rotate(${props => (props.isOpen ? 90 : 0)}deg);
  user-select: none;
`;

// Styled back button to navigate back to the Control Panel
const BackButton = styled(motion.button)`
  background: #3b82f6;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2rem auto 0;
  display: block;
  font-size: 1rem;
  transition: background 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

// A simple SubSection component for inner headings
const SubSection = ({ title, children }) => (
  <div style={{ marginBottom: '1rem' }}>
    <h3 style={{ margin: '0.5rem 0', color: '#16a085' }}>{title}</h3>
    <div>{children}</div>
  </div>
);

// ============ Accordion Section Component ============

const AccordionSection = ({ title, children, innerRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <AccordionSectionContainer ref={innerRef}>
      <AccordionHeader onClick={toggleOpen}>
        {title} <Chevron isOpen={isOpen}>›</Chevron>
      </AccordionHeader>
      <AccordionContent
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && children}
      </AccordionContent>
    </AccordionSectionContainer>
  );
};

// ============ Main User Manual Page Component ============

const UserManualPage = () => {
  const navigate = useNavigate();

  // Create refs for each section to scroll into view.
  const overviewRef = useRef(null);
  const systemReqRef = useRef(null);
  const uiSetupRef = useRef(null);
  const uiNavRef = useRef(null);
  const controlInterfaceRef = useRef(null);
  const troubleshootingRef = useRef(null);
  const futureUpdatesRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ManualContainer>
      <Title>SE4450 Robotic Arm User Manual</Title>
      <Subtitle>Version 1.0</Subtitle>

      <TableOfContents>
        <TOCItem onClick={() => scrollToRef(overviewRef)}>1. Overview</TOCItem>
        <TOCItem onClick={() => scrollToRef(systemReqRef)}>2. System Requirements</TOCItem>
        <TOCItem onClick={() => scrollToRef(uiSetupRef)}>3. UI Platform Setup</TOCItem>
        <TOCItem onClick={() => scrollToRef(uiNavRef)}>4. UI Navigation</TOCItem>
        <TOCItem onClick={() => scrollToRef(controlInterfaceRef)}>5. Control Interface</TOCItem>
        <TOCItem onClick={() => scrollToRef(troubleshootingRef)}>6. Troubleshooting FAQ</TOCItem>
        <TOCItem onClick={() => scrollToRef(futureUpdatesRef)}>7. Future Updates</TOCItem>
      </TableOfContents>

      <AccordionSection title="1. Overview" innerRef={overviewRef}>
        <Paragraph>
          The SE4450 Robotic Arm is a cost-effective, modular system designed for precision control and real-time visualization. This manual provides guidance for using the Robotic Arm UI Platform and understanding its core functionalities.
        </Paragraph>
      </AccordionSection>

      <AccordionSection title="2. System Requirements" innerRef={systemReqRef}>
        <List>
          <li><strong>OS:</strong> Windows / Linux / macOS (compatible with virtual machine environments)</li>
          <li><strong>Browser:</strong> Chrome / Firefox / Safari (for UI access)</li>
          <li><strong>Hardware:</strong> Stable internet connection, USB/Bluetooth interface for arm communication (pending hardware integration)</li>
        </List>
      </AccordionSection>

      <AccordionSection title="3. UI Platform Setup" innerRef={uiSetupRef}>
        <SubSection title="Access the UI">
          <Paragraph>
            Launch the React-based interface locally or via a hosted server. Ensure that all dependencies (Node.js, npm packages) are installed.
          </Paragraph>
        </SubSection>
        <SubSection title="Connect the Robotic Arm">
          <Paragraph>
            <em>Note:</em> Pending hardware delivery. Once the components arrive, link the arm to the UI through a virtual machine using the provided drivers.
          </Paragraph>
        </SubSection>
      </AccordionSection>

      <AccordionSection title="4. UI Navigation" innerRef={uiNavRef}>
        <SubSection title="Dashboard Sections">
          <Paragraph>
            <strong>About Us:</strong> View project details, team information, and deliverables.
          </Paragraph>
          <Paragraph>
            <strong>Blueprints:</strong> Access joint schematics to understand the mechanical design and connectivity.
          </Paragraph>
          <Paragraph>
            <strong>3D Model GUI:</strong> Visualize the arm’s structure. <em>Future Update:</em> Real-time movement tracking via webhooks.
          </Paragraph>
        </SubSection>
      </AccordionSection>

      <AccordionSection title="5. Control Interface (Pending Hardware Integration)" innerRef={controlInterfaceRef}>
        <Paragraph>
          <strong>Responsive Controls:</strong> Input commands (e.g., joint angles, gripper actions) through the UI. Use emergency stop/adjustment buttons for real-time corrections.
        </Paragraph>
        <Paragraph>
          <strong>Communication System:</strong> Ensure low-latency communication by verifying network stability. Monitor status indicators for connection health.
        </Paragraph>
      </AccordionSection>

      <AccordionSection title="6. Troubleshooting FAQ" innerRef={troubleshootingRef}>
        <Table>
          <thead>
            <tr>
              <Th>Issue</Th>
              <Th>Solution</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>UI unresponsive</Td>
              <Td>Refresh the browser; check Node.js server status.</Td>
            </tr>
            <tr>
              <Td>Latency in commands</Td>
              <Td>Verify network stability or switch to wired communication.</Td>
            </tr>
            <tr>
              <Td>3D model not updating</Td>
              <Td>Ensure webhooks are active (future feature).</Td>
            </tr>
          </tbody>
        </Table>
      </AccordionSection>

      <AccordionSection title="7. Future Updates" innerRef={futureUpdatesRef}>
        <List>
          <li><strong>Hardware Integration:</strong> Enable direct arm control post-delivery of components.</li>
          <li><strong>Real-Time Visualization:</strong> Sync the 3D model with physical arm movements for debugging.</li>
          <li><strong>Cost Reduction:</strong> Track progress on budget-friendly design enhancements.</li>
        </List>
      </AccordionSection>

      {/* Back Button to navigate back to the Control Panel */}
      <BackButton onClick={() => navigate('/controlPanel')}>
        Back to Control Panel
      </BackButton>
    </ManualContainer>
  );
};

export default UserManualPage;
