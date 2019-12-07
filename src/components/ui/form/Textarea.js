import React from 'react';
import PropTypes from 'prop-types';

import { FORM_BASE_CLASS } from './Form';


const FORM_TEXTAREA_CLASS = `${FORM_BASE_CLASS}__field__textarea`;


export function Textarea({ className, ...rest }) {
    const textareaClassName = `${FORM_TEXTAREA_CLASS} ${className}`;

    return <textarea className={textareaClassName} {...rest} />;
}

Textarea.propTypes = {
    className: PropTypes.string,
};
