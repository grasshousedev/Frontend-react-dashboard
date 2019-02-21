import React, { Fragment, useState } from 'react';

export function Headers() {
    const [showHeaders, setShowHeaders] = useState(true);

    return <Fragment>
        <h2 onClick={() => setShowHeaders(!showHeaders)} style={{ cursor: 'pointer' }}>Headers</h2>
        {showHeaders && <Fragment>
            <div className="flex-container">
                <div className="w-300"><h1>h1 Title</h1></div>
            </div>
            <div className="flex-container">
                <div className="w-300"><h2>h2 Title</h2></div>
            </div>
            <div className="flex-container">
                <div className="w-300"><h3>h3 Title</h3></div>
            </div>
            <div className="flex-container">
                <div className="w-300"><h4>h4 Title</h4></div>
            </div>
            <div className="flex-container">
                <div className="w-300"><h5>h5 Title</h5></div>
            </div>
        </Fragment>}
    </Fragment>;
};
