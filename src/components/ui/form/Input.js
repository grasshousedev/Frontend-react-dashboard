import React from 'react';
import PropTypes from 'prop-types';

import { UI_FORM_BASE_CLASS } from './Form';

const UI_FORM_INPUT = `${UI_FORM_BASE_CLASS}__field__input`;

export function Input({ ...rest }) {
    return <input className={UI_FORM_INPUT} {...rest} />;
}

Input.propTypes = {

};
