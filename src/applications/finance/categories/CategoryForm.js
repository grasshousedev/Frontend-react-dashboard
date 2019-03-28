import React from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';

export function CategoryForm({ values, setFieldValue, handleBlur }) {
    return <div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="category-name">Name</label>
            <div className="ui-form__field-input">
                <input id="category-name" value={values.name}                    
                    onChange={e => setFieldValue('name', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="category-color">Color</label>
            <div className="ui-form__field-input">
                <CompactPicker id="category-color"
                    color={values.attributes_ui.color}
                    onChangeComplete={color => setFieldValue('attributes_ui.color', color.hex)}
                />
            </div>
        </div>
    </div>;
}

CategoryForm.propTypes = {
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
    handleBlur: PropTypes.func,
};
