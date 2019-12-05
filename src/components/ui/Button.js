import React from 'react';
import PropTypes from 'prop-types';

export function Button ({ children, onClick, disabled, type, classes, ...rest }) {
    const buttonProps = {
        disabled,
        type: type || 'button',
    };
    if (onClick) buttonProps.onClick = onClick;

    const extraClasses = classes
        ? Array.isArray(classes)
            ? classes.map(c => `ui-button--${c}`).join(' ')
            : `ui-button--${classes}`
        : '';

    const buttonClass = `ui-button ${extraClasses}`;

    return <button className={buttonClass} {...buttonProps} {...rest}>
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
    type: PropTypes.string,
    classes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    className: PropTypes.string,
};

Button.defaultProps = {
    disabled: false,
};
