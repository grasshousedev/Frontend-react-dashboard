import React from 'react';
import PropTypes from 'prop-types';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateTime } from 'luxon';

import { FORM_INPUT_CLASS } from './Input';


export function DatePicker({ inputProps, overlayWrapperProps, onDayChange, onDayChangeFormat='string', format, value, ...rest }) {
    const dateFormat = format || 'yyyy-MM-dd';

    return <DayPickerInput
        overlayComponent={props => OverlayComponent({ ...props, ...overlayWrapperProps })}
        inputProps={{ ...inputProps, className: `${inputProps.className || ''} ${FORM_INPUT_CLASS}` }}
        format={dateFormat}
        parseDate={parseDate}
        formatDate={formatDate}
        onDayChange={d => {
            if (!onDayChange) return;

            const ret = onDayChangeFormat === 'date'
                ? d
                : formatDate(d, dateFormat);
            onDayChange(ret);
        }}
        selectedDays={value ? parseDate(value, dateFormat) : undefined}
        {...rest}
    />;
}

DatePicker.propTypes = {
    inputProps: PropTypes.object,
    overlayWrapperProps: PropTypes.object,
    onDayChange: PropTypes.func,
    onDayChangeFormat: PropTypes.oneOf(['date', 'string']),
    format: PropTypes.string,
    value: PropTypes.string,
};


function OverlayComponent({ children, classNames, selectedDay, ...props }) {
    return <div
        className={classNames.overlayWrapper}
        {...props}
    >
        <div className={classNames.overlay}>
            {children}
        </div>
    </div>;
}

OverlayComponent.propTypes = {
    classNames: PropTypes.object.isRequired,
    selectedDay: PropTypes.instanceOf(Date),
    children: PropTypes.node.isRequired,
};

function parseDate(str, format) {
    const parsed = DateTime.fromFormat(str, format).toJSDate();
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format) {
    return DateTime.fromJSDate(date).toFormat(format);
}
