import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { propTypeChildren } from 'components/utils';

const LINK_CLASS = 'ui-link';
const LINK_CONTENT_CLASS = `${LINK_CLASS}__content`;

export function ALink({ className='', classes=[], children, ...rest }) {
    const contentClassName = `${LINK_CONTENT_CLASS} ${classes.map(c => `${LINK_CONTENT_CLASS}--${c}`)}`;

    return <Link className={`${className} ${LINK_CLASS}`} {...rest}>
        <span className={contentClassName}>{children}</span>
    </Link>;
}

ALink.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.array,
    children: propTypeChildren,
};