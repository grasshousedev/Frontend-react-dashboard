import React from 'react';
import PropTypes from 'prop-types';
import { propTypeChildren } from 'components/utils';


const UI_BADGE_CLASS = 'ui-badge';


export function Badge({ className, color, backgroundColor, isRounded=true, tag: Tag='span', children, ...rest }) {
    const colorClass = color || '';
    const backgroundColorClass = backgroundColor ? `background-${backgroundColor}` : '';
    const roundedClass = isRounded ? `${UI_BADGE_CLASS}--rounded` : '';
    const badgeClass = `${UI_BADGE_CLASS} ${colorClass} ${backgroundColorClass} ${roundedClass} ${className}`;

    return <Tag className={badgeClass} {...rest}>{children}</Tag>;
}

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    isRounded: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: propTypeChildren,
};
