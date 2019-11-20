import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { UI_FORM_BASE_CLASS } from './Form';


function FormSelect({ options, extraClassName, value, key='value', ...rest }) {
    const selectClassName = `${UI_FORM_BASE_CLASS}__react-select ${extraClassName || ''}`;
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
    key: PropTypes.string,
    extraClassName: PropTypes.string,
};

export { FormSelect as Select };
