// src/components/RobotPageWrapper.js
import React, { useState } from 'react';

function RobotPageWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5rem',
            color: '#333',
          }}
        >
          Loading Vue Application...
        </div>
      )}
      <iframe
        title="VueApp"
        src="http://localhost:3001" // URL where your Vue app is hosted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden',
        }}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default RobotPageWrapper;
