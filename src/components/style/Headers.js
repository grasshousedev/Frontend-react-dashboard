import React, { Fragment, useState } from 'react';
import { Lorem } from 'components/ui/Lorem';

export function Headers() {
    const [showHeaders, setShowHeaders] = useState(true);

    return <Fragment>
        <h2 onClick={() => setShowHeaders(!showHeaders)} style={{ cursor: 'pointer' }}>Headers</h2>
        {showHeaders && <Fragment>
            <div className="ui-section">
                <div className="ui-section__text">
                    <h1>h1 Title</h1>
                    <Lorem />
                </div>
            </div>
            <div className="ui-section">
                <div className="ui-section__text">
                    <h2>h2 Title</h2>
                    <Lorem />
                </div>
            </div>
            <div className="ui-section">
                <div className="ui-section__text">
                    <h3>h3 Title</h3>
                    <Lorem />
                </div>
            </div>
            <div className="ui-section">
                <div className="ui-section__text">
                    <h4>h4 Title</h4>
                    <Lorem />
                </div>
            </div>
            <div className="ui-section">
                <div className="ui-section__text">
                    <h5>h5 Title</h5>
                    <Lorem />
                </div>
            </div>
        </Fragment>}
    </Fragment>;
};
