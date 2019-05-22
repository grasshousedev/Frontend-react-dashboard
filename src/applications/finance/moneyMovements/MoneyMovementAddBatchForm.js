import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import { getFormReactSelectStyles } from 'components/style/formReactSelect';
import { withFinance } from '../storeConnection';

function MoneyMovementAddBatchForm({ values, setFieldValue, handleBlur, finance, addMoneyMovement, cloneMoneyMovement, deleteMoneyMovement, isSubmitting }) {
    const [formState, setFormState] = useState({
        newUserRel: {},
        viewAdvancedOptions: {},
    });

    const categories = Object.values(finance.categories).sort((c1, c2) => c1.full_name > c2.full_name ? 1 : -1);
    const contexts = Object.values(finance.contexts).sort((c1, c2) => c1.start_date > c2.start_date ? -1 : 1);
    const tags = Object.values(finance.tags).map(t => t.name).sort();
    const users = Object.values(finance.users).sort((u1, u2) => u1.full_name > u2.full_name ? 1 : -1);

    const addNewUserRel = (batchIndex) => {
        const newUserRel = formState.newUserRel[batchIndex];
        if (newUserRel.user && newUserRel.percentage) {
            setFieldValue('users_relation', batchIndex, [...values[batchIndex].users_relation, { ...newUserRel[batchIndex] }]);
            setFormState({ ...formState, newUserRel: { ...formState.newUserRel, [batchIndex]: {}} });
        }
    };

    const setUserPercentage = (batchIndex, percentage, index) => {
        setFieldValue('users_relation', batchIndex, values[batchIndex].users_relation.map((ur, urIndex) => {
            if (urIndex === index) {
                return { ...ur, percentage };
            } else {
                return ur;
            }
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
                <div className="col-xs-12 col-lg-9">{/* Basic */}
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
                                <input id="money-movement-amount" value={mmValues.amount}   
                                    className="ui-form-v__input"             
                                    disabled={disableEntry}   
                                    onChange={e => setFieldValue('amount', batchIndex, e.target.value)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '110px' }}>{/* Date */}
                            <div className="ui-form-v__field-input">
                                <input id="money-movement-movement-date" value={mmValues.movement_date || ''}               
                                    className="ui-form-v__input" 
                                    disabled={disableEntry}    
                                    onChange={e => setFieldValue('movement_date', batchIndex, e.target.value)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '250px' }}>{/* Category */}
                            <div className="ui-form-v__field-input">
                                <Select
                                    classNamePrefix="react-select"
                                    className="ui-form__react-select"
                                    disabled={disableEntry}
                                    onChange={entry => setFieldValue('category', batchIndex, entry.value)}
                                    options={categories.map(c => ({ value: c.id, label: c.full_name}))}
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '300px' }}>{/* Tags */}
                            <div className="ui-form-v__field-input">
                                <CreatableSelect id="money-movement-tags"
                                    className="ui-form__react-select"
                                    classNamePrefix="react-select"
                                    styles={formReactSelectStyles}
                                    isMulti={true}
                                    isDisabled={disableEntry}
                                    options={tags.map(tag => ({ value: tag, label: tag }))}
                                    onChange={(options, action) => onMultiSelectChange(options, action, batchIndex, 'tags')}
                                    value={mmValues.tags ? mmValues.tags.map(t => ({ value: t, label: t})) : []}
                                    placeholder="Select tags..."
                                />
                            </div>
                        </div>
                        <div className="ui-form-v__field" style={{ maxWidth: '100px' }}>{/* Actions */}
                            
                            <div className="ui-form-v__field-input p-t-5">
                                <i className="fas fa-cog cursor-pointer" onClick={() => toggleAdvancedOptions(batchIndex)} />
                                <i className="far fa-copy cursor-pointer m-l-10" onClick={() => cloneMoneyMovement(batchIndex)} />
                                <i className="fas fa-trash cursor-pointer m-l-10" onClick={() => deleteMoneyMovement(batchIndex)} />
                                {batchIndex === values.length - 1 &&
                                    <i className="fas fa-plus cursor-pointer m-l-10" onClick={() => addMoneyMovement()} />  
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-lg-3">{/* Advanced */}
                    {viewAdvancedOptions[batchIndex] && <div>
                        <div className="col-xs-12 col-lg-6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <div className="ui-form-v__field">{/* Context */}
                                <label className="ui-form-v__label" htmlFor="money-movement-context">Context</label>
                                <div className="ui-form-v__field-input">
                                    <select id="money-movement-context" value={mmValues.context || ''}
                                        className="ui-form-v__select"
                                        disabled={disableEntry}
                                        onChange={e => setFieldValue('context', batchIndex, e.target.value ? +e.target.value : null)}
                                    >
                                        <option value={null}>No context</option>
                                        {contexts.map(context => {
                                            return <option value={context.id} key={context.id}>{context.name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="ui-form-v__field">{/* Description */}
                                <label className="ui-form-v__label" htmlFor="money-movement-description">Description</label>
                                <div className="ui-form-v__field-input">
                                    <textarea id="money-movement-description" value={mmValues.description || ''}  
                                        className="ui-form-v__textarea"  
                                        disabled={disableEntry}                
                                        onChange={e => setFieldValue('description', batchIndex, e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <div className="ui-form-v__field">{/* Users */}
                                <label className="ui-form-v__label" htmlFor="money-movement-user-relation">User</label>
                                <div className="ui-form-v__field-input">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Percentage</th>
                                                <th width="30"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select id="money-movement-user-relation" value={formState.newUserRel.user || ''}
                                                        className="ui-form-v__select"
                                                        disabled={disableEntry}
                                                        onChange={e => setFormState({ ...formState, newUserRel: { ...formState.newUserRel, user: e.target.value ? +e.target.value : null }})}
                                                    >
                                                        <option value={null}>No split</option>
                                                        {users.map(user => {
                                                            return <option value={user.id} key={user.id}>{user.full_name}</option>;
                                                        })}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input id="money-movement-user-relation" value={formState.newUserRel.percentage || ''}                
                                                        className="ui-form-v__input" 
                                                        disabled={disableEntry}   
                                                        onChange={e => setFormState({ ...formState, newUserRel: { ...formState.newUserRel, percentage: e.target.value ? parseFloat(e.target.value) : null }})}
                                                    />
                                                </td>
                                                <td>
                                                    {!disableEntry && <i className="fas fa-plus cursor-pointer" onClick={() => addNewUserRel(batchIndex)} />}
                                                </td>
                                            </tr>
                                            {mmValues.users_relation.map((ur, index) => {
                                                return <tr key={`user-relation-${index}`}>
                                                    <td>
                                                        {finance.users[ur.user].full_name}
                                                    </td>
                                                    <td>
                                                        <input id="money-movement-user-relation" value={ur.percentage || ''}  
                                                            className="ui-form-v__input" 
                                                            disabled={disableEntry}                 
                                                            onChange={e => setUserPercentage(e.target.value ? parseFloat(e.target.value) : null, batchIndex, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        {!disableEntry && <i className="fas fa-minus cursor-pointer" onClick={() => removeUserRel(batchIndex, index)} />}
                                                    </td>                                
                                                </tr>;
                                            })}
                                        </tbody>
                                    </table>
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

