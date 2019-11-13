import React from 'react';
import PropTypes from 'prop-types';

// import '@fortawesome/fontawesome-free/css/all.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


const UI_ICON_CLASS = 'ui-icon';


export function Icon({ name, size, modifiers, className, ...rest }) {
    const sizeClass = `${UI_ICON_CLASS}--${size}`;
    const modifiersClasses = Array.isArray(modifiers)
        ? modifiers.map(m => `${UI_ICON_CLASS}--${m}`).join(' ')
        : typeof modifiers === 'string' ? `${UI_ICON_CLASS}--${modifiers}` : '';
    return <i className={`${UI_ICON_CLASS} material-icons ${name} ${modifiersClasses} ${sizeClass} ${className}`} {...rest} />;
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    modifiers: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'normal', 'big', 'bigger', 'huge']),
};

Icon.defaultProps = {
    modifiers: '',
    className: '',
    size: 'normal',
};
