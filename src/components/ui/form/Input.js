import React from 'react';
import PropTypes from 'prop-types';

import { FORM_BASE_CLASS } from './Form';


const FORM_INPUT_CLASS = `${FORM_BASE_CLASS}__field__input`;
const FORM_INPUT_DISABLED_CLASS = `${FORM_INPUT_CLASS}--disabled`;
const FORM_INPUT_INVALID_CLASS = `${FORM_INPUT_CLASS}--invalid`;


export function Input({ className, disabled, invalid, ...rest }) {
    const disabledClass = disabled ? FORM_INPUT_DISABLED_CLASS : '';
    const invalidClass = invalid ? FORM_INPUT_INVALID_CLASS : '';
    const inputClassName = `${FORM_INPUT_CLASS} ${disabledClass} ${invalidClass} ${className}`;

    return <input className={inputClassName} disabled={disabled} {...rest} />;
}

Input.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    invalid: PropTypes.any,
};
