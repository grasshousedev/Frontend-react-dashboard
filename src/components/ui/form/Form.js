import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

export const SPACEBAR_CODE = 32;

export const UI_FORM_BASE_CLASS = 'ui-form';
const CONTAINER_CLASS = `${UI_FORM_BASE_CLASS}__container`;
const FIELD_CLASS = `${UI_FORM_BASE_CLASS}__field`;
const LABEL_CLASS = `${UI_FORM_BASE_CLASS}__label`;
const FIELD_INPUT_CLASS = `${UI_FORM_BASE_CLASS}__field-input`;
const FIELD_INPUT_BORDER_CLASS = `${FIELD_INPUT_CLASS}__border`;

export function Form({ children }) {
    const formClassName = `${UI_FORM_BASE_CLASS} ${CONTAINER_CLASS}`;

    return <div className={formClassName}>
        {children}
    </div>;
}

Form.propTypes = {
    children: propTypeChildren,
};


export function Field({ label, children, className, vertical=false, labelProps={}, inputProps={}, ...rest }) {
    const {
        className: labelClassName = '',
        width: labelWidth = 175,
        style: labelStyle = {},
        ...lProps
    } = labelProps;
    const {
        className: inputClassName = '',
        ...iProps
    } = inputProps;

    const fieldClass = `${FIELD_CLASS} ${vertical ? `${FIELD_CLASS}--vertical` : ''} ${className || ''}`;
    const labelClass = `${LABEL_CLASS} ${vertical ? `${LABEL_CLASS}--vertical` : ''}`;
    const fieldInputClass = `${FIELD_INPUT_CLASS} ${vertical ? `${FIELD_INPUT_CLASS}--vertical` : ''}`;

    return <div className={fieldClass} {...rest}>
        {label &&
            <div
                className={`${labelClass} ${labelClassName}`}
                style={{ width: labelWidth, ...labelStyle }}
                {...lProps}
            >{label}</div>
        }
        <div className={`${fieldInputClass} ${inputClassName}`} {...iProps}>
            {children}
            <span className={FIELD_INPUT_BORDER_CLASS}></span>
        </div>
    </div>;
}

Field.propTypes = {
    label: propTypeChildren,
    children: propTypeChildren,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    labelProps: PropTypes.object,
    inputProps: PropTypes.object,
};