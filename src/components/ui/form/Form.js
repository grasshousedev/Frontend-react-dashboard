import React from 'react';
import PropTypes from 'prop-types';
import { propTypeChildren } from 'components/utils';

export const SPACEBAR_CODE = 32;

export const FORM_BASE_CLASS = 'ui-form';
const CONTAINER_CLASS = `${FORM_BASE_CLASS}__container`;


export function Form({ children, className='', ...rest }) {
    const formClassName = `${FORM_BASE_CLASS} ${CONTAINER_CLASS} ${className}`;

    return <div className={formClassName} {...rest}>
        {children}
    </div>;
}

Form.propTypes = {
    children: propTypeChildren,
    className: PropTypes.string,
};
