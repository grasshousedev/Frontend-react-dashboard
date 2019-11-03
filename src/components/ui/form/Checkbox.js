import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { UI_FORM_BASE_CLASS } from './Form';
import { propTypeChildren } from 'components/utils';

const UI_FORM_CHECKBOX_CLASS = `${UI_FORM_BASE_CLASS}__field__checkbox`;
const UI_FORM_CHECKBOX_CHECKBOX_CLASS = `${UI_FORM_CHECKBOX_CLASS}__checkbox`;
const UI_FORM_CHECKBOX_INDICATOR_CLASS = `${UI_FORM_CHECKBOX_CLASS}__indicator`;
const UI_FORM_LABEL_CLASS = `${UI_FORM_CHECKBOX_CLASS}__label`;

const SPACEBAR_CODE = 32;

export function Checkbox({ checked, onClick, label, disabled, ...rest }) {
    const checkboxRef = useRef(null);

    const checkedCheckboxClass = checked ? `${UI_FORM_CHECKBOX_CLASS}--checked` : '';
    const disabledCheckboxClass = disabled ? `${UI_FORM_CHECKBOX_CLASS}--disabled` : '';
    const checkboxClass = `${UI_FORM_CHECKBOX_CLASS} ${checkedCheckboxClass} ${disabledCheckboxClass}`;
    const checkedCheckboxIndicatorClass = checked ? `${UI_FORM_CHECKBOX_INDICATOR_CLASS}--checked` : '';
    const disabledCheckboxIndicatorClass = disabled ? `${UI_FORM_CHECKBOX_INDICATOR_CLASS}--disabled` : '';
    const indicatorClass = `${UI_FORM_CHECKBOX_INDICATOR_CLASS} ${checkedCheckboxIndicatorClass} ${disabledCheckboxIndicatorClass}`;
    const labelClass = `${UI_FORM_LABEL_CLASS}`;

    const onCheckboxClick = () => !disabled && onClick(!checked);
    const onKeyDown = e => {
        if (e.keyCode === SPACEBAR_CODE) {
            e.preventDefault();
            e.stopPropagation();
            onCheckboxClick();
        }
    };

    return <div className={checkboxClass}
        onClick={onCheckboxClick}
        onKeyDown={onKeyDown}
        tabIndex="0"
    >
        <input type="checkbox"
            ref={checkboxRef}
            className={UI_FORM_CHECKBOX_CHECKBOX_CLASS}
            checked={checked}
            disabled={disabled}
            onChange={onCheckboxClick}
            tabIndex="-1"
            {...rest}
        />
        <div className={indicatorClass} />
        {label &&
            <div className={labelClass}>{label}</div>
        }
    </div>;
}

Checkbox.propTypes = {
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: propTypeChildren,
};
