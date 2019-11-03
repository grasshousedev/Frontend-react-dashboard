import React from 'react';
import PropTypes from 'prop-types';

import { UI_FORM_BASE_CLASS } from './Form';

const UI_FORM_TOGGLE_CLASS = `${UI_FORM_BASE_CLASS}__field__toggle`;
const UI_FORM_TOGGLE_CHECKBOX_CLASS = `${UI_FORM_TOGGLE_CLASS}__checkbox`;
const UI_FORM_TOGGLE_SWITCH_CLASS = `${UI_FORM_TOGGLE_CLASS}__switch`;

export function Toggle({ checked, onClick, ...rest }) {
    const checkedToggleClass = checked ? 'ui-form__field__toggle--checked' : '';
    const toggleClass = `${UI_FORM_TOGGLE_CLASS} ${checkedToggleClass}`;
    const checkedSwitchClass = checked ? 'ui-form__field__toggle__switch--checked' : '';
    const switchClass = `${UI_FORM_TOGGLE_SWITCH_CLASS} ${checkedSwitchClass}`;

    return <div className={toggleClass} onClick={onClick}>
        <input type="checkbox"
            className={UI_FORM_TOGGLE_CHECKBOX_CLASS}
            {...rest}
        />
        <div className={switchClass} />
    </div>;
}

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
};
