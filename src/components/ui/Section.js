import React from 'react';
import PropTypes from 'prop-types';


export function Section({ children, title, isLast=false }) {
    const className = `ui-section ${isLast ? 'ui-section--last' : ''}`;

    return <div className={className}>
        {title && typeof title === 'string' && <h1 className="ui-title">{title}</h1>}
        {title && typeof title !== 'string' && {title}}
        {children}
    </div>;
}

Section.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    isLast: PropTypes.bool,
};