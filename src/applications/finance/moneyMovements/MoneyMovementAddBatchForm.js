import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import { getFormReactSelectStyles } from 'components/style/formReactSelect';
import { withFinance } from '../storeConnection';
import { UserAssignment } from './forms/UserAssignment';


function MoneyMovementAddBatchForm({ values, setFieldValue, handleBlur, finance, addMoneyMovement, cloneMoneyMovement, deleteMoneyMovement, isSubmitting }) {
    const [formState, setFormState] = useState({
        viewAdvancedOptions: {},
    });

    const categories = Object.values(finance.categories).sort((c1, c2) => c1.full_name > c2.full_name ? 1 : -1);
    const contexts = Object.values(finance.contexts).sort((c1, c2) => c1.start_date > c2.start_date ? -1 : 1);
    const tags = Object.values(finance.tags).map(t => t.name).sort();
    const users = Object.values(finance.users).sort((u1, u2) => u1.full_name > u2.full_name ? 1 : -1);

    const addNewUserRel = (batchIndex, newUserRel) => {
        if (newUserRel.user && newUserRel.percentage) {
            setFieldValue('users_relation', batchIndex, [...values[batchIndex].users_relation, { ...newUserRel }]);
        }
    };

    const setUserPercentage = (batchIndex, percentage, index) => {
        setFieldValue('users_relation', batchIndex, values[batchIndex].users_relation.map((ur, urIndex) => {
            return urIndex === index ? { ...ur, percentage } : ur;
        }));
    };

    const removeUserRel = (batchIndex, index) => {
        setFieldValue('users_relation', batchIndex, values[batchIndex].users_relation.filter((ur, urIndex) => index !== urIndex));
    };

    const onMultiSelectChange = (options, action, batchIndex, fieldName) => {
        const newValues = options.map(o => o.value);

        setFieldValue(fieldName, batchIndex, newValues);
    };

    const toggleAdvancedOptions = (batchIndex) => {
        setFormState({
            ...formState,
            viewAdvancedOptions: { ...viewAdvancedOptions, [batchIndex]: !!!viewAdvancedOptions[batchIndex] }
        });
    };

    const formReactSelectStyles = getFormReactSelectStyles();

    const { viewAdvancedOptions } = formState;

    return <div style={{ width: '100%' }}>
        {values.map((mmValues, batchIndex) => {  
            const disableEntry = isSubmitting;      
            return <Fragment key={batchIndex}> 
            <div className="row ui-form p-t-10">
                <div className="col-xs-12 col-sm-6" style={{ maxWidth: '315px' }}>{/* Basic */}
                    <div className="ui-form-v__field-group">
                        <div className="ui-form-v__field" style={{ maxWidth: '50px' }}>{/* Movement */}
                            <div className="ui-form-v__field-input">
                                <select id="money-movement-movement" value={mmValues.movement || ''}
                                    className="ui-form-v__select"
                                    disabled={disableEntry}
                                    onChange={e => setFieldValue('movement', batchIndex, e.target.value)}
                                >
                                    <option value="-">-</option>
                                    <option value="+">+</option>
                                </select>
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '120px' }}>{/* Amount */}
                            <div className="ui-form-v__field-input">
                                <input value={mmValues.amount}   
                                    className="ui-form-v__input"             
                                    disabled={disableEntry}  
                                    placeholder="Amount" 
                                    onChange={e => setFieldValue('amount', batchIndex, e.target.value)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '110px' }}>{/* Date */}
                            <div className="ui-form-v__field-input">
                                <input value={mmValues.movement_date || ''}               
                                    className="ui-form-v__input" 
                                    disabled={disableEntry}  
                                    placeholder="dd-mm-yyyy"  
                                    onChange={e => setFieldValue('movement_date', batchIndex, e.target.value)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-form-v__field-group">
                        <div className="ui-form-v__field" style={{ maxWidth: '250px' }}>{/* Category */}
                            <div className="ui-form-v__field-input">
                                <Select
                                    classNamePrefix="react-select"
                                    className="ui-form__react-select"
                                    disabled={disableEntry}
                                    placeholder="Category"
                                    value={mmValues.category ? { value: mmValues.category, label: finance.categories[mmValues.category].full_name } : null}
                                    onChange={entry => setFieldValue('category', batchIndex, entry.value)}
                                    options={categories.map(c => ({ value: c.id, label: c.full_name}))}
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '300px' }}>{/* Tags */}
                            <div className="ui-form-v__field-input">
                                <CreatableSelect
                                    className="ui-form__react-select"
                                    classNamePrefix="react-select"
                                    styles={formReactSelectStyles}
                                    isMulti={true}
                                    isDisabled={disableEntry}
                                    options={tags.map(tag => ({ value: tag, label: tag }))}
                                    onChange={(options, action) => onMultiSelectChange(options, action, batchIndex, 'tags')}
                                    value={mmValues.tags ? mmValues.tags.map(t => ({ value: t, label: t})) : []}
                                    placeholder="Select tags"
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '140px' }}>{/* Actions */}                            
                            <div className="ui-form-v__field-input">
                                <i className="fas fa-cog icon-control" tabIndex="0" onClick={() => toggleAdvancedOptions(batchIndex)} />
                                <i className="far fa-copy icon-control" tabIndex="0" onClick={() => cloneMoneyMovement(batchIndex)} />
                                {values.length > 1 &&
                                    <i className="fas fa-trash icon-control" tabIndex="0" onClick={() => deleteMoneyMovement(batchIndex)} />}
                                {batchIndex === values.length - 1 &&
                                    <i className="fas fa-plus icon-control" tabIndex="0" onClick={() => addMoneyMovement()} />  
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">{/* Advanced */}
                    {viewAdvancedOptions[batchIndex] && <div className="row">
                        <div className="col-xs-12 col-md-6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <div className="ui-form-v__field">{/* Context */}
                                <label className="ui-form-v__label" htmlFor="money-movement-context">Context</label>
                                <div className="ui-form-v__field-input">
                                    <Select
                                        classNamePrefix="react-select"
                                        className="ui-form__react-select"
                                        disabled={disableEntry}
                                        placeholder="Context"
                                        value={mmValues.context ? { value: mmValues.context, label: finance.contexts[mmValues.context].name } : null}
                                        onChange={entry => setFieldValue('context', batchIndex, entry.value)}
                                        options={contexts.map(c => ({ value: c.id, label: c.name}))}
                                    />
                                </div>
                            </div>
                            <div className="ui-form-v__field">{/* Description */}
                                <label className="ui-form-v__label" htmlFor="money-movement-description">Description</label>
                                <div className="ui-form-v__field-input">
                                    <textarea
                                        value={mmValues.description || ''}  
                                        className="ui-form-v__textarea"  
                                        disabled={disableEntry}                
                                        onChange={e => setFieldValue('description', batchIndex, e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="ui-form-v__field">{/* Users */}
                                <div className="ui-form-v__field-input">
                                    <UserAssignment
                                        users={users}
                                        usersRef={finance.users}
                                        values={mmValues}
                                        addNewUserRel={(newUserRel) => addNewUserRel(batchIndex, newUserRel)}
                                        removeUserRel={(index) => removeUserRel(batchIndex, index)}
                                        setUserPercentage={(index, percentage) => setUserPercentage(batchIndex, index, percentage)}
                                        disabled={disableEntry}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <hr className="ui-divider" />
            </Fragment>;
        })}
    </div>;
}

MoneyMovementAddBatchForm.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object),
    setFieldValue: PropTypes.func,
    addMoneyMovement: PropTypes.func,
    cloneMoneyMovement: PropTypes.func,
    deleteMoneyMovement: PropTypes.func,
    handleBlur: PropTypes.func,
    finance: PropTypes.object,
    isSubmitting: PropTypes.bool,
};

const connectedMoneyMovementAddBatchForm = withFinance(MoneyMovementAddBatchForm);
export { connectedMoneyMovementAddBatchForm as MoneyMovementAddBatchForm };

