import React from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';

export function ContextForm({ values, setFieldValue, handleBlur }) {
    return <div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-name">Name</label>
            <div className="ui-form__field-input">
                <input id="context-name" value={values.name}                    
                    onChange={e => setFieldValue('name', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-start-date">Start Date</label>
            <div className="ui-form__field-input">
                <input id="context-start-date" value={values.start_date || ''}                    
                    onChange={e => setFieldValue('start_date', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-end-date">End Date</label>
            <div className="ui-form__field-input">
                <input id="context-end-date" value={values.end_date || ''}                    
                    onChange={e => setFieldValue('end_date', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-description">Description</label>
            <div className="ui-form__field-input">
                <textarea id="context-description" value={values.description || ''}                    
                    onChange={e => setFieldValue('description', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-icon">Icon</label>
            <div className="ui-form__field-input">
                <input id="context-icon" value={values.attributes_ui.icon || ''}                    
                    onChange={e => setFieldValue('attributes_ui.icon', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="context-color">Color</label>
            <div className="ui-form__field-input">
                <CompactPicker id="context-color"
                    color={values.attributes_ui.color}
                    onChangeComplete={color => setFieldValue('attributes_ui.color', color.hex)}
                />
            </div>
        </div>
    </div>;
}

ContextForm.propTypes = {
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
    handleBlur: PropTypes.func,
};
