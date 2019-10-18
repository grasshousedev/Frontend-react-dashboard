import React from 'react';
import PropTypes from 'prop-types';

export function PageBody({ children, fullHeight, withPageHeader, pageBodyRef }) {
    const fullHeightClass = fullHeight
        ? withPageHeader
            ? 'ui-page-body--full-height__with-page-header'
            : 'ui-page-body--full-height'
        : '';
    const bodyClass = `ui-page-body ${fullHeightClass}`;

    return <div className={bodyClass} ref={pageBodyRef}>
        {children}
    </div>;
}

PageBody.propTypes = {
    children: PropTypes.node,
    fullHeight: PropTypes.bool,
    withPageHeader: PropTypes.bool,
    pageBodyRef: PropTypes.object,
};