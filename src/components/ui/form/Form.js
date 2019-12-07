import React from 'react';

import { propTypeChildren } from 'components/utils';

export const SPACEBAR_CODE = 32;

export const FORM_BASE_CLASS = 'ui-form';
const CONTAINER_CLASS = `${FORM_BASE_CLASS}__container`;


export function Form({ children }) {
    const formClassName = `${FORM_BASE_CLASS} ${CONTAINER_CLASS}`;

    return <div className={formClassName}>
        {children}
    </div>;
}

Form.propTypes = {
    children: propTypeChildren,
};
