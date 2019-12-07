import React from 'react';
import PropTypes from 'prop-types';
import { propTypeChildren } from 'components/utils';

const TEXT_CLASS = 'ui-text';
const TEXT_MONOSPACE_CLASS = `${TEXT_CLASS}__monospace`;


export function Monospace({ children, className='' }) {
    const monospaceClassName = `${TEXT_MONOSPACE_CLASS} ${className}`;

    return <span className={monospaceClassName}>{children}</span>;
}

Monospace.propTypes = {
    children: propTypeChildren,
    className: PropTypes.string,
};
