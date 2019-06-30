import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { hasTag } from '../headerUtils';
import { APPLICATIONS } from './applicationsList';

function Applications ({ query }) {
    
    const navigate = (path) => {
        const { history, resetDashboardMenu } = this.props;
        
        history.push(path);
        resetDashboardMenu();
    };

    return <div className="ui-tiles__container ui-tiles">
        {APPLICATIONS.map(application => {
            if (hasTag(application.tags, query)) {
                return <div                        
                    className="ui-tiles__tile"
                    key={application.name}
                    onClick={() => navigate(application.link)}
                >
                    <div className="ui-tiles__tile__icon">
                        {application.icon}
                    </div>
                    <div className="ui-tiles__tile__label">
                        {application.name}
                    </div>
                </div>;
            }
            return <Fragment key={application.name} />;
        })}
    </div>;

}

Applications.propTypes = {
    query: PropTypes.string,
    resetDashboardMenu: PropTypes.func,
    history: PropTypes.object,
};

export const ConnectedApplications = withRouter(Applications);
