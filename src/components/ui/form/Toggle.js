import React from 'react';
import PropTypes from 'prop-types';

import { FORM_BASE_CLASS, SPACEBAR_CODE } from './Form';

const FORM_TOGGLE_CLASS = `${FORM_BASE_CLASS}__field__toggle`;
const FORM_TOGGLE_CHECKED_CLASS = `${FORM_TOGGLE_CLASS}--checked`;
const FORM_TOGGLE_DISABLED_CLASS = `${FORM_TOGGLE_CLASS}--disabled`;
const FORM_TOGGLE_CHECKBOX_CLASS = `${FORM_TOGGLE_CLASS}__checkbox`;
const FORM_TOGGLE_SWITCH_CLASS = `${FORM_TOGGLE_CLASS}__switch`;
const FORM_TOGGLE_SWITCH_CHECKED_CLASS = `${FORM_TOGGLE_SWITCH_CLASS}--checked`;
const FORM_TOGGLE_SWITCH_DISABLED_CLASS = `${FORM_TOGGLE_SWITCH_CLASS}--checked`;


export function Toggle({ checked, onClick, disabled, ...rest }) {
    const checkedToggleClass = checked ? FORM_TOGGLE_CHECKED_CLASS : '';
    const disabledToggleClass = disabled ? FORM_TOGGLE_DISABLED_CLASS : '';
    const toggleClass = `${FORM_TOGGLE_CLASS} ${checkedToggleClass} ${disabledToggleClass}`;
    const checkedSwitchClass = checked ? FORM_TOGGLE_SWITCH_CHECKED_CLASS : '';
    const disabledSwitchClass = disabled ? FORM_TOGGLE_SWITCH_DISABLED_CLASS : '';
    const switchClass = `${FORM_TOGGLE_SWITCH_CLASS} ${checkedSwitchClass} ${disabledSwitchClass}`;

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
            className={FORM_TOGGLE_CHECKBOX_CLASS}
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
