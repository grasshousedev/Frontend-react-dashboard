import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { propTypeChildren } from 'components/utils';

const LINK_CLASS = 'ui-link';
const LINK_CONTENT_CLASS = `${LINK_CLASS}__content`;

export function ALink({ className='', children, ...rest }) {
    return <Link className={`${className} ${LINK_CLASS}`} {...rest}>
        <span className={LINK_CONTENT_CLASS}>{children}</span>
    </Link>;
}

ALink.propTypes = {
    className: PropTypes.string,
    children: propTypeChildren,
};