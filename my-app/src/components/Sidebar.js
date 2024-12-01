import React, { useState } from 'react';

function Sidebar() {
    const [motorTab, setMotorTab] = useState(1);

    return (
        <div>
            <div className="sidebar">
                <button className="sidebar-button" onClick={() => setMotorTab(1)}>Power Source</button>
                <button className="sidebar-button" onClick={() => setMotorTab(2)}>Motors</button>
                <button className="sidebar-button" onClick={() => setMotorTab(3)}>Encoding</button>
                <button className="sidebar-button" onClick={() => setMotorTab(4)}>Control Nodes</button>
            </div>
            <div className="motor-content active">
                {motorTab === 1 && <p>DC Bus overvoltage trip level: 30 V</p>}
                {motorTab === 2 && <p>Motors Configuration Content</p>}
                {motorTab === 3 && <p>Encoding Configuration Content</p>}
                {motorTab === 4 && <p>Control Nodes Configuration Content</p>}
            </div>
        </div>
    );
}

export default Sidebar;
