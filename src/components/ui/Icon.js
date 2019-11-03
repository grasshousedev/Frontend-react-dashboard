import React from 'react';
import PropTypes from 'prop-types';

import '@fortawesome/fontawesome-free/css/all.css';


export function Icon({ name, category, modifiers, extraClasses, ...rest }) {
    return <i className={`${category} fa-${name} ${modifiers} ${extraClasses}`} {...rest} />;
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    modifiers: PropTypes.string,
    extraClasses: PropTypes.string,
};

Icon.defaultProps = {
    category: 'fas',
    modifiers: '',
    extraClasses: '',
};
