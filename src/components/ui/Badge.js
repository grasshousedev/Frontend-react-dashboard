import React from 'react';
import PropTypes from 'prop-types';
import { propTypeChildren } from 'components/utils';


const BADGE_CLASS = 'ui-badge';


export function Badge({ className, color, backgroundColor, type='rounded', tag: Tag='span', children, ...rest }) {
    const colorClass = color || '';
    const backgroundColorClass = backgroundColor ? `background-${backgroundColor}` : '';
    const typeClass = type && type !== 'squared' ? `${BADGE_CLASS}--${type}` : '';
    const badgeClass = `${BADGE_CLASS} ${colorClass} ${backgroundColorClass} ${typeClass} ${className}`;

    return <Tag className={badgeClass} {...rest}>{children}</Tag>;
}

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    type: PropTypes.oneOf(['rounded', 'circular', 'squared']),
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: propTypeChildren,
};
