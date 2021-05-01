import React from 'react';
import './ToggleButton.scss';

type toggleButtonProps = {
    toggleHandler: () => void,
    isActive: boolean
}

function ToggleButton({toggleHandler, isActive}) {
    return (
        <div className={`switch ${isActive ? 'active' : null}`} onClick={toggleHandler} >
            <div className="slider" />
        </div>
    )
}

export default ToggleButton
