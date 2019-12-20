import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_CLASS } from './Page';

const PAGE_BODY_CLASS = `${PAGE_CLASS}__body`;

export function PageBody({ children, fullHeight, withPageHeader, className, pageBodyRef, ...rest }) {
    const fullHeightClass = fullHeight
        ? withPageHeader
            ? `${PAGE_BODY_CLASS}--full-height__with-page-header`
            : `${PAGE_BODY_CLASS}--full-height`
        : '';
    const bodyClass = `${PAGE_BODY_CLASS} ${fullHeightClass} ${className}`;

    return <div className={bodyClass} ref={pageBodyRef} {...rest}>
        {children}
    </div>;
}

PageBody.propTypes = {
    children: PropTypes.node,
    fullHeight: PropTypes.bool,
    withPageHeader: PropTypes.bool,
    className: PropTypes.string,
    pageBodyRef: PropTypes.object,
};