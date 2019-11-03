import React from 'react';
import PropTypes from 'prop-types';

import { UI_FORM_BASE_CLASS, SPACEBAR_CODE } from './Form';

const UI_FORM_TOGGLE_CLASS = `${UI_FORM_BASE_CLASS}__field__toggle`;
const UI_FORM_TOGGLE_CHECKBOX_CLASS = `${UI_FORM_TOGGLE_CLASS}__checkbox`;
const UI_FORM_TOGGLE_SWITCH_CLASS = `${UI_FORM_TOGGLE_CLASS}__switch`;


export function Toggle({ checked, onClick, disabled, ...rest }) {
    const checkedToggleClass = checked ? 'ui-form__field__toggle--checked' : '';
    const disabledToggleClass = disabled ? 'ui-form__field__toggle--disabled' : '';
    const toggleClass = `${UI_FORM_TOGGLE_CLASS} ${checkedToggleClass} ${disabledToggleClass}`;
    const checkedSwitchClass = checked ? 'ui-form__field__toggle__switch--checked' : '';
    const disabledSwitchClass = disabled ? 'ui-form__field__toggle__switch--disabled' : '';
    const switchClass = `${UI_FORM_TOGGLE_SWITCH_CLASS} ${checkedSwitchClass} ${disabledSwitchClass}`;

    const onToggleClick = () => !disabled && onClick(!checked);
    const onKeyDown = e => {
        if (e.keyCode === SPACEBAR_CODE) {
            e.preventDefault();
            e.stopPropagation();
            onToggleClick();
        }
    };
    return <div className={toggleClass}
        onClick={onToggleClick}
        onKeyDown={onKeyDown}
        tabIndex="0"
    >
        <input type="checkbox"
            className={UI_FORM_TOGGLE_CHECKBOX_CLASS}
            checked={checked}
            disabled={disabled}
            onChange={onToggleClick}
            tabIndex="-1"
            {...rest}
        />
        <div className={switchClass} />
    </div>;
}

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
};
