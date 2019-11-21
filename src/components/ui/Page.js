import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from '../utils';


export const PAGE_CLASS = 'ui-page';
const PAGE_CONTAINER_CLASS = `${PAGE_CLASS}__container`;


export function Page({ width, height, className, style, children, ...rest }) {
    const pageStyle = { width, height, ...style };
    const pageClass = `${PAGE_CONTAINER_CLASS} ${className}`;

    return <div style={pageStyle} className={pageClass} {...rest}>{children}</div>;
}

Page.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
    children: propTypeChildren,
};
