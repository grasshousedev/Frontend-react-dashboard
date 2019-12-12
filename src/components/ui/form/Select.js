import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { FORM_BASE_CLASS } from './Form';


const SELECT_CLASS = `${FORM_BASE_CLASS}__react-select`;
const SELECT_INVALID_CLASS = `${SELECT_CLASS}--invalid`;


function FormSelect({ options, className='', value, invalid, key='value', ...rest }) {
    const invalidClass = invalid ? SELECT_INVALID_CLASS : '';
    const selectClassName = `${SELECT_CLASS} ${invalidClass} ${className}`;

    const mappedOptions = useMemo(() =>
        options.reduce((all, o) => { all[o[key]] = o; return all; }, {}),
        [options, key]
    );
    const selectValue = mappedOptions[value];

    return <Select
        className={selectClassName}
        classNamePrefix="react-select"
        options={options}
        value={selectValue}
        {...rest}
    />;
}

FormSelect.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    invalid: PropTypes.any,
    key: PropTypes.string,
    className: PropTypes.string,
};

export { FormSelect as Select };
