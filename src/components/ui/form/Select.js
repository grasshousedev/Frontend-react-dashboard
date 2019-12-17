import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { FORM_BASE_CLASS } from './Form';


const SELECT_CLASS = `${FORM_BASE_CLASS}__react-select`;
const SELECT_INVALID_CLASS = `${SELECT_CLASS}--invalid`;


function FormSelect({ options, className='', value, invalid=false, disabled=false, key='value', isMulti=false, creatable=false, ...rest }) {
    const Tag = creatable ? CreatableSelect : Select;
    const invalidClass = invalid ? SELECT_INVALID_CLASS : '';
    const selectClassName = `${SELECT_CLASS} ${invalidClass} ${className}`;

    const mappedOptions = useMemo(() =>
        options.reduce((all, o) => { all[o[key]] = o; return all; }, {}),
        [options, key]
    );
    const selectValue = isMulti
        ? value.map(v => mappedOptions[v] || { [key]: v, label: v })
        : value ? mappedOptions[value] : null;

    return <Tag
        className={selectClassName}
        classNamePrefix="react-select"
        options={options}
        value={selectValue}
        isDisabled={disabled}
        isMulti={isMulti}
        {...rest}
    />;
}

FormSelect.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    invalid: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.string,
    className: PropTypes.string,
    isMulti: PropTypes.bool,
    creatable: PropTypes.bool,
};

export { FormSelect as Select };
