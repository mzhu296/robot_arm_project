import React, { useState } from 'react';

function MotorContent() {
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [selectedEncoder, setSelectedEncoder] = useState(null);

    const handleMotorSelection = (motor) => {
        setSelectedMotor(motor);
    };

    const handleEncoderSelection = (encoder) => {
        setSelectedEncoder(encoder);
    };

    const customizeMotor = () => {
        if (selectedMotor) {
            alert(`Customizing: ${selectedMotor}`);
        }
    };

    const customizeEncoder = () => {
        if (selectedEncoder) {
            alert(`Customizing: ${selectedEncoder}`);
        }
    };

    return (
        <div>
            <h2>Status and Configuration of Motors</h2>
            <p>Select a motor to customize:</p>
            <form>
                <label>
                    <input
                        type="radio"
                        name="motor"
                        value="D5065"
                        onChange={() => handleMotorSelection('D5065')}
                    />
                    D5065
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="motor"
                        value="M8325"
                        onChange={() => handleMotorSelection('M8325')}
                    />
                    M8325
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="motor"
                        value="Botwheel"
                        onChange={() => handleMotorSelection('Botwheel')}
                    />
                    Botwheel
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="motor"
                        value="other"
                        onChange={() => handleMotorSelection('other')}
                    />
                    Other
                </label>
                <br />
            </form>
            {selectedMotor && (
                <div>
                    <button className="customize-button" onClick={customizeMotor}>
                        {selectedMotor === 'other'
                            ? 'Create Other Motor'
                            : `Customize ${selectedMotor}`}
                    </button>
                </div>
            )}

            <h2>Encoding Menu</h2>
            <p>Select an encoder to customize:</p>
            <form>
                <label>
                    <input
                        type="radio"
                        name="encoder"
                        value="AMT 10x"
                        onChange={() => handleEncoderSelection('AMT 10x')}
                    />
                    AMT 10x
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="encoder"
                        value="AMT21xB"
                        onChange={() => handleEncoderSelection('AMT21xB')}
                    />
                    AMT21xB
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="encoder"
                        value="Hail Encoder"
                        onChange={() => handleEncoderSelection('Hail Encoder')}
                    />
                    Hail Encoder
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="encoder"
                        value="Incremental Encoder"
                        onChange={() => handleEncoderSelection('Incremental Encoder')}
                    />
                    Incremental Encoder
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="encoder"
                        value="other"
                        onChange={() => handleEncoderSelection('other')}
                    />
                    Other Encoder
                </label>
                <br />
            </form>
            {selectedEncoder && (
                <div>
                    <button className="customize-button" onClick={customizeEncoder}>
                        {selectedEncoder === 'other'
                            ? 'Create Other Encoder'
                            : `Customize ${selectedEncoder}`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default MotorContent;
