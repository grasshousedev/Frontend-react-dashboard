import React from 'react';
import PropTypes from 'prop-types';

import { UI_FORM_BASE_CLASS } from './Form';


const FORM_INPUT_CLASS = `${UI_FORM_BASE_CLASS}__field__input`;


export function Input({ className, ...rest }) {
    const inputClassName = `${FORM_INPUT_CLASS} ${className}`;

    return <input className={inputClassName} {...rest} />;
}

Input.propTypes = {
    className: PropTypes.string,
};
