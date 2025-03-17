import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// ===========================
// Layout & Basic Styles
// ===========================

// A subtle gradient background for the entire page
const PageContainer = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #e1f5fe, #f3e5f5);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

// Each card represents a settings section (e.g., Movement, Safety)
const SettingsCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }

  h2 {
    margin-bottom: 0.8rem;
  }
`;

// Form row wrapper for label + input
const SettingsRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

// Reusable label
const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #444;
`;

// Basic input, select, range stylings
const StyledInput = styled.input`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const StyledSelect = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const StyledRange = styled.input`
  margin-top: 0.25rem;
  width: 100%;
`;

// A styled Save button
const SaveButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #7e57c2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 3px 10px rgba(126, 87, 194, 0.3);

  &:hover {
    background: #6a48a6;
  }
`;

// ===========================
// Component
// ===========================
const BeautifulArmSettingsPage = () => {
  // ======== Movement Settings ========
  const [speedMode, setSpeedMode] = useState('medium');
  const [armSensitivity, setArmSensitivity] = useState(5);
  const [rangeOfMotion, setRangeOfMotion] = useState(180);

  // ======== Safety Settings ========
  const [collisionDetection, setCollisionDetection] = useState(true);
  const [maxPayload, setMaxPayload] = useState(2.5);
  const [emergencyStopTimeout, setEmergencyStopTimeout] = useState(3);

  // ======== Diagnostics Settings ========
  const [autoDiagnostics, setAutoDiagnostics] = useState(true);
  const [diagnosticFrequency, setDiagnosticFrequency] = useState(60);

  // ======== Calibration Settings ========
  const [calibrationMode, setCalibrationMode] = useState('auto');
  const [joint1Offset, setJoint1Offset] = useState(0);
  const [joint2Offset, setJoint2Offset] = useState(0);

  // ======== Advanced Settings ========
  const [enableLogging, setEnableLogging] = useState(false);
  const [firmwareChannel, setFirmwareChannel] = useState('stable');

  // Handles "Save" button click
  const handleSave = () => {
    const updatedSettings = {
      movement: {
        speedMode,
        armSensitivity,
        rangeOfMotion
      },
      safety: {
        collisionDetection,
        maxPayload,
        emergencyStopTimeout
      },
      diagnostics: {
        autoDiagnostics,
        diagnosticFrequency
      },
      calibration: {
        calibrationMode,
        joint1Offset,
        joint2Offset
      },
      advanced: {
        enableLogging,
        firmwareChannel
      }
    };
    // Replace this with an API call or your own logic
    console.log('Arm Settings:', updatedSettings);
    alert('Arm settings saved!');
  };

  return (
    <PageContainer>
      {/* Movement Settings */}
      <SettingsCard
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Movement Settings</h2>
        <SettingsRow>
          <StyledLabel>Speed Mode</StyledLabel>
          <StyledSelect
            value={speedMode}
            onChange={(e) => setSpeedMode(e.target.value)}
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </StyledSelect>
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Arm Sensitivity ({armSensitivity})</StyledLabel>
          <StyledRange
            type="range"
            min="1"
            max="10"
            value={armSensitivity}
            onChange={(e) => setArmSensitivity(e.target.value)}
          />
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Range of Motion (°)</StyledLabel>
          <StyledInput
            type="number"
            value={rangeOfMotion}
            onChange={(e) => setRangeOfMotion(e.target.value)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Safety Settings */}
      <SettingsCard
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2>Safety Settings</h2>
        <SettingsRow>
          <StyledLabel>
            <input
              type="checkbox"
              checked={collisionDetection}
              onChange={() => setCollisionDetection(!collisionDetection)}
            />{' '}
            Enable Collision Detection
          </StyledLabel>
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Max Payload (kg)</StyledLabel>
          <StyledInput
            type="number"
            step="0.1"
            value={maxPayload}
            onChange={(e) => setMaxPayload(e.target.value)}
          />
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Emergency Stop Timeout (seconds)</StyledLabel>
          <StyledInput
            type="number"
            step="1"
            value={emergencyStopTimeout}
            onChange={(e) => setEmergencyStopTimeout(e.target.value)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Diagnostics Settings */}
      <SettingsCard
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2>Diagnostics</h2>
        <SettingsRow>
          <StyledLabel>
            <input
              type="checkbox"
              checked={autoDiagnostics}
              onChange={() => setAutoDiagnostics(!autoDiagnostics)}
            />{' '}
            Automatic Diagnostics
          </StyledLabel>
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Diagnostic Frequency (minutes)</StyledLabel>
          <StyledInput
            type="number"
            step="1"
            value={diagnosticFrequency}
            onChange={(e) => setDiagnosticFrequency(e.target.value)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Calibration Settings */}
      <SettingsCard
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2>Calibration</h2>
        <SettingsRow>
          <StyledLabel>Calibration Mode</StyledLabel>
          <StyledSelect
            value={calibrationMode}
            onChange={(e) => setCalibrationMode(e.target.value)}
          >
            <option value="auto">Automatic</option>
            <option value="manual">Manual</option>
          </StyledSelect>
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Joint 1 Offset (°)</StyledLabel>
          <StyledInput
            type="number"
            value={joint1Offset}
            onChange={(e) => setJoint1Offset(e.target.value)}
          />
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Joint 2 Offset (°)</StyledLabel>
          <StyledInput
            type="number"
            value={joint2Offset}
            onChange={(e) => setJoint2Offset(e.target.value)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Advanced Settings */}
      <SettingsCard
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2>Advanced Settings</h2>
        <SettingsRow>
          <StyledLabel>
            <input
              type="checkbox"
              checked={enableLogging}
              onChange={() => setEnableLogging(!enableLogging)}
            />{' '}
            Enable Detailed Logging
          </StyledLabel>
        </SettingsRow>
        <SettingsRow>
          <StyledLabel>Firmware Channel</StyledLabel>
          <StyledSelect
            value={firmwareChannel}
            onChange={(e) => setFirmwareChannel(e.target.value)}
          >
            <option value="stable">Stable</option>
            <option value="beta">Beta</option>
            <option value="experimental">Experimental</option>
          </StyledSelect>
        </SettingsRow>
      </SettingsCard>

      {/* Save Button */}
      <SaveButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
      >
        Save Settings
      </SaveButton>
    </PageContainer>
  );
};

export default BeautifulArmSettingsPage;
