import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// =======================
// Layout & Basic Styling
// =======================

const PanelContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #1e293b;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

const MainArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

const DashboardCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

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

const ChatBox = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const ActivityLog = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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

  const [activePage, setActivePage] = useState('🎛️ Dashboard');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Example base URL and chat ID for your maxKB AI endpoint
  const BASE_URL = 'http://localhost:8080/api/application/675917aa-03bf-11f0-9ac2-0242ac110002';
  const CHAT_ID  = '95a1a1b2eea0164a';
  const AI_ENDPOINT = `${BASE_URL}/chat_message/${CHAT_ID}`;

  const pages = [
    { label: '🎛️ Dashboard', route: '/controlPanel' },
    { label: '🚀 Arm Control', route: '/robot' },
    { label: '⚙️ Settings',   route: '/settings' },
    { label: '📜 Logs',       route: '/logs' },
    { label: '📖 User Manual',route: '/userManual' },
    { label: '🎥 Video Demo', route: '/video-demo' },
    { label: ' 🏠︎ Log Out', route: '/' }
  ];

  const handleNavigation = (page, route) => {
    setActivePage(page);
    if (route) navigate(route);
  };

  /**
   * handleSendChat
   *  - triggered onKeyDown in ChatInput
   */
  const handleSendChat = async (e) => {
    if (e.key === 'Enter' && chatInput.trim() !== '') {
      const userMsg = chatInput.trim();
      setChatMessages((prev) => [...prev, { text: userMsg, sender: 'user' }]);
      setChatInput('');

      try {
        const payload = {
          message: userMsg,
          re_chat: false,
          stream: true,
          form_data: {},
          image_list: [],
          document_list: [],
          audio_list: [],
          runtime_node_id: '',
          node_data: {},
          chat_record_id: '',
          child_node: {}
        };

        const response = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Error from AI: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const aiReply = data.message || 'No response from AI';

        setChatMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }]);
      } catch (err) {
        console.error('Error sending message to AI:', err);
        setChatMessages((prev) => [...prev, { text: `Error: ${err.message}`, sender: 'ai' }]);
      }
    }
  };

  return (
    <PanelContainer>
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

      <MainArea>
        {/* Dashboard Overview */}
        <DashboardCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>Dashboard Overview</h2>
          <p><strong>Arm Position:</strong> 30° angle</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Battery:</strong> 78%</p>
        </DashboardCard>

        {/* Quick Links */}
        <QuickLinks>
          <QuickLinkCard whileHover={{ y: -5 }} onClick={() => navigate('/diagnostics')}>
            ⚡ Diagnostics
          </QuickLinkCard>
          <QuickLinkCard whileHover={{ y: -5 }} onClick={() => alert('Maintenance Not Required!')}>
            🧰 Maintenance
          </QuickLinkCard>
        </QuickLinks>

        {/* AI Chat Card
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
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleSendChat}
          />
        </DashboardCard> */}

        {/* === Embedded Chat Interface === */}
        <DashboardCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ width: '100%', height: '500px' }}>
            <iframe
              src="http://localhost:8080/ui/chat/95a1a1b2eea0164a"
              style={{ width: '100%', height: '100%' }}
              frameBorder="0"
              allow="microphone"
              title="Chat Interface"
            />
          </div>
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
