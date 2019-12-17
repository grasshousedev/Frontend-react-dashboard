import React from 'react';
import PropTypes from 'prop-types';
import { propTypeChildren } from 'components/utils';

export function Button ({ children, tag: Tag='button', onClick, disabled, type, classes, ...rest }) {
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

    return <Tag className={buttonClass} {...buttonProps} {...rest}>
        {children}
    </Tag>;
}

Button.propTypes = {
    children: propTypeChildren.isRequired,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    classes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    className: PropTypes.string,
};

Button.defaultProps = {
    disabled: false,
};
