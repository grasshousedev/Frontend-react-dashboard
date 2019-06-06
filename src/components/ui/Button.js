import React from 'react';
import PropTypes from 'prop-types';

export function Button ({ children, onClick, disabled, classes }) {
    const props = { disabled };
    if (onClick) props.onClick = onClick;

    const extraClasses = classes
        ? Array.isArray(classes)
            ? classes.map(c => `ui-button--${c}`).join(' ')
            : `ui-button--${classes}`
        : '';

    return <button
        className={`ui-button ${extraClasses}`}
        {...props}
    >
        {children}
    </button>;
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    classes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

Button.defaultProps = {
    disabled: false,
};
