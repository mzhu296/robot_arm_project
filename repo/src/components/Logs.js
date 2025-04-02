import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* ============= Styled Components ============= */

/** 
 * Gradient background with soft pastel tones for a more colorful look.
 * Centers the logs content and applies a box-shadow for depth.
 */
const LogsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #ecfeff 0%, #fef9c3 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

/**
 * A card-like wrapper for the actual logs content,
 * with rounded corners, background, and subtle shadow.
 */
const LogsCard = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

/** 
 * Page title styling: 
 * vibrant color, slightly larger font, margin spacing
 */
const Title = styled.h2`
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  color: #0f172a;
  text-align: center;
`;

/**
 * Container for all log items, spaced out with a gap
 */
const LogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

/**
 * Individual log item with interactive hover effect.
 * Slight scale and shadow shift on hover.
 */
const LogItem = styled.div`
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  strong {
    color: #1f2937;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: #eff6ff; /* Subtle color highlight */
  }
`;

/**
 * Message when no logs exist
 */
const NoLogsText = styled.p`
  color: #475569;
  text-align: center;
`;

/* ============= LogsPage Component ============= */

function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data || []))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <LogsContainer>
      <LogsCard>
        <Title>All Activity Logs</Title>
        {logs.length === 0 ? (
          <NoLogsText>No logs found.</NoLogsText>
        ) : (
          <LogsList>
            {logs.map((log, idx) => (
              <LogItem key={idx}>
                <strong>{log.timestamp}</strong> — {log.message}
              </LogItem>
            ))}
          </LogsList>
        )}
      </LogsCard>
    </LogsContainer>
  );
}

export default LogsPage;
