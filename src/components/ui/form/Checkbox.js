import React from 'react';
import PropTypes from 'prop-types';

import { FORM_BASE_CLASS, SPACEBAR_CODE } from './Form';
import { propTypeChildren } from 'components/utils';

const FORM_CHECKBOX_CLASS = `${FORM_BASE_CLASS}__field__checkbox`;
const FORM_CHECKBOX_CHECKBOX_CLASS = `${FORM_CHECKBOX_CLASS}__checkbox`;
const FORM_CHECKBOX_INDICATOR_CLASS = `${FORM_CHECKBOX_CLASS}__indicator`;
const FORM_LABEL_CLASS = `${FORM_CHECKBOX_CLASS}__label`;


export function Checkbox({ checked, onClick, label, disabled, ...rest }) {
    const checkedCheckboxClass = checked ? `${FORM_CHECKBOX_CLASS}--checked` : '';
    const disabledCheckboxClass = disabled ? `${FORM_CHECKBOX_CLASS}--disabled` : '';
    const checkboxClass = `${FORM_CHECKBOX_CLASS} ${checkedCheckboxClass} ${disabledCheckboxClass}`;
    const checkedCheckboxIndicatorClass = checked ? `${FORM_CHECKBOX_INDICATOR_CLASS}--checked` : '';
    const disabledCheckboxIndicatorClass = disabled ? `${FORM_CHECKBOX_INDICATOR_CLASS}--disabled` : '';
    const indicatorClass = `${FORM_CHECKBOX_INDICATOR_CLASS} ${checkedCheckboxIndicatorClass} ${disabledCheckboxIndicatorClass}`;
    const labelClass = `${FORM_LABEL_CLASS}`;

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
            className={FORM_CHECKBOX_CHECKBOX_CLASS}
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
