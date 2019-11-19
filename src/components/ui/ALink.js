import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { propTypeChildren } from 'components/utils';

const UI_LINK_CLASS = 'ui-link';

export function ALink({ className, children, ...rest }) {
    return <Link className={`${className} ${UI_LINK_CLASS}`} {...rest}>{children}</Link>;
}

ALink.propTypes = {
    className: PropTypes.string,
    children: propTypeChildren,
};