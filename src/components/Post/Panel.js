import React from 'react';

const Panel = ({ symbols }) => {    
    return (
        <div className="panel">
            <button>Save</button>
            <div className="panel_numbers">
                <span>{symbols}</span>
                <span>55</span>
            </div>
        </div>
    )
}

export default Panel