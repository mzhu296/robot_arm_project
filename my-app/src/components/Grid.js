import React from 'react';

function Grid() {
    const renderGrid = (id) => {
        const items = Array.from({ length: 25 }, (_, i) => (
            <div key={i} className={`grid-item ${i === 12 ? 'current-position' : ''}`}>
                {i === 12 ? 'Current Position' : ''}
            </div>
        ));
        return <div id={id} className="grid-container">{items}</div>;
    };

    return (
        <div>
            <h3>X-axis movement:</h3>
            {renderGrid('x-axis-grid')}
            <h3>Y-axis movement:</h3>
            {renderGrid('y-axis-grid')}
            <h3>Z-axis movement:</h3>
            {renderGrid('z-axis-grid')}
        </div>
    );
}

export default Grid;
