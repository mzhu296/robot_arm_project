import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// =======================
// Layout & Basic Styling
// =======================

// Main container for the control panel (sidebar + main content)
const PanelContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Sidebar navigation
const Sidebar = styled.div`
  width: 220px;
  background: #1e293b;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Sidebar buttons, highlighting the active page
const SidebarButton = styled(motion.button)`
  background: ${({ active }) => (active ? '#3b82f6' : 'transparent')};
  border: none;
  color: inherit;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #334155;
  }
`;

// Main content area
const MainArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

// =======================
// Reusable UI Components
// =======================

// A reusable card for dashboard sections
const DashboardCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

// A container holding small “quick link” cards for shortcuts
const QuickLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// Individual quick link cards
const QuickLinkCard = styled(motion.div)`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #2563eb;
  }
`;

// Chat box wrapper
const ChatBox = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  padding: 1rem;
  height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Chat input styling
const ChatInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

// Activity Log container
const ActivityLog = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-top: 1.5rem;
`;

const ActivityItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.5rem 0;
  &:last-child {
    border-bottom: none;
  }
`;

// =======================
// Main Component
// =======================

const ControlPanel = () => {
  const navigate = useNavigate();

  // Track which sidebar page is currently active
  const [activePage, setActivePage] = useState('Dashboard');

  // AI Chat states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Sidebar navigation click
  const handleNavigation = (page, route) => {
    setActivePage(page);
    if (route) navigate(route);
  };
  

  // Send a chat message on Enter
  const handleSendChat = (e) => {
    if (e.key === 'Enter' && chatInput.trim() !== '') {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
      setChatInput('');
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: 'AI response here...', sender: 'ai' }]);
      }, 800);
    }
  };

  const pages = [
    { label: '🎛️ Dashboard', route: '/dashboard' },
    { label: '🚀 Arm Control', route: '/robot' },
    { label: '⚙️ Settings', route: '/settings' },
    { label: '📜 Logs', route: '/logs' }
  ];

  return (
    

    <PanelContainer>
      {/* ========== Sidebar ========== */}
      <Sidebar>
        {pages.map(({ label, route }) => (
            <SidebarButton
            key={label}
            active={activePage === label}
            onClick={() => handleNavigation(label, route)}
            >
            {label}
            </SidebarButton>
        ))}
        </Sidebar>

      {/* ========== Main Content ========== */}
      <MainArea>
        {/* A simple Dashboard Overview */}
        <DashboardCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>Dashboard Overview</h2>
          <p><strong>Arm Position:</strong> 30° angle</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Battery:</strong> 78%</p>
        </DashboardCard>

        {/* Quick Links (different from the sidebar) */}
        <QuickLinks>
          <QuickLinkCard whileHover={{ y: -5 }} onClick={() => alert('Diagnostics panel opened!')}>
            ⚡ Diagnostics
          </QuickLinkCard>
          <QuickLinkCard whileHover={{ y: -5 }} onClick={() => alert('Maintenance panel opened!')}>
            🧰 Maintenance
          </QuickLinkCard>
          <QuickLinkCard whileHover={{ y: -5 }} onClick={() => alert('User Manual opened!')}>
            📖 User Manual
          </QuickLinkCard>
        </QuickLinks>

        {/* AI Chat Card */}
        <DashboardCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>🤖 Arm Assistant</h3>
          <ChatBox>
            {chatMessages.map((msg, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <strong>{msg.sender === 'user' ? 'You:' : 'AI:'}</strong> {msg.text}
              </motion.div>
            ))}
          </ChatBox>
          <ChatInput
            placeholder="Ask AI about the arm..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={handleSendChat}
          />
        </DashboardCard>

        {/* Activity Log */}
        <ActivityLog>
          <h4>📋 Recent Activities</h4>
          {['Arm moved to 30°', 'Battery checked: 78%', 'User logged in'].map((act, idx) => (
            <ActivityItem key={idx}>{act}</ActivityItem>
          ))}
        </ActivityLog>
      </MainArea>
    </PanelContainer>
  );
};

export default ControlPanel;
