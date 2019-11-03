import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

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


export function Field({ label, children, fieldProps, labelProps, inputProps }) {
    const fProps = fieldProps || {};
    const lProps = labelProps || {};
    const iProps = inputProps || {};

    const labelWidth = lProps.width || 175;

    return <div className={FIELD_CLASS} {...fProps.rest}>
        <div className={LABEL_CLASS} style={{ width: labelWidth }} {...lProps.rest}>
            {label}
        </div>
        <div className={FIELD_INPUT_CLASS} {...iProps.rest}>
            {children}
            <span className={FIELD_INPUT_BORDER_CLASS}></span>
        </div>
    </div>;
}

Field.propTypes = {
    label: propTypeChildren,
    children: propTypeChildren,
    fieldProps: PropTypes.shape({
        rest: PropTypes.object,
    }),
    labelProps: PropTypes.shape({
        rest: PropTypes.object,
    }),
    inputProps: PropTypes.shape({
        rest: PropTypes.object,
    }),
};