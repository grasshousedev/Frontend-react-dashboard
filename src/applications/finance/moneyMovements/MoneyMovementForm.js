import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFinance } from '../storeConnection';


function MoneyMovementForm({ values, setFieldValue, handleBlur, finance }) {

    const [formState, setFormState] = useState({
        newUserRel: {},
    });

    const categories = Object.values(finance.categories).sort((c1, c2) => c1.full_name > c2.full_name ? 1 : -1);
    const contexts = Object.values(finance.contexts).sort((c1, c2) => c1.start_date > c2.start_date ? -1 : 1);
    const users = Object.values(finance.users).sort((u1, u2) => u1.full_name > u2.full_name ? 1 : -1);
    
    const addNewUserRel = () => {
        if (formState.newUserRel.user && formState.newUserRel.percentage) {
            setFieldValue('users_relation', [...values.users_relation, { ...formState.newUserRel }]);
            setFormState({ ...formState, newUserRel: {} });
        }
    };

    const setUserPercentage = (percentage, index) => {
        setFieldValue('users_relation', values.users_relation.map((ur, urIndex) => {
            if (urIndex === index) {
                return { ...ur, percentage };
            } else {
                return ur;
            }
        }));
    };

    const removeUserRel = (index) => {
        setFieldValue('users_relation', values.users_relation.filter((ur, urIndex) => index !== urIndex));
    };

    return <div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-movement">Movement</label>
            <div className="ui-form__field-input">
                <select id="money-movement-movement" value={values.movement || ''}
                    onChange={e => setFieldValue('movement', e.target.value)}
                >
                    <option value="-">-</option>
                    <option value="+">+</option>
                </select>
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-amount">Amount</label>
            <div className="ui-form__field-input">
                <input id="money-movement-amount" value={values.amount}                    
                    onChange={e => setFieldValue('amount', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-category">Category</label>
            <div className="ui-form__field-input">
                <select id="money-movement-category" value={values.category || ''}
                    onChange={e => setFieldValue('category', +e.target.value)}
                >
                    {categories.map(category => {
                        return <option value={category.id} key={category.id}>{category.full_name}</option>;
                    })}
                </select>
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-context">Context</label>
            <div className="ui-form__field-input">
                <select id="money-movement-context" value={values.context || ''}
                    onChange={e => setFieldValue('context', e.target.value ? +e.target.value : null)}
                >
                    <option value={null}>No context</option>
                    {contexts.map(context => {
                        return <option value={context.id} key={context.id}>{context.name}</option>;
                    })}
                </select>
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-movement-date">Movement Date</label>
            <div className="ui-form__field-input">
                <input id="money-movement-movement-date" value={values.movement_date || ''}                    
                    onChange={e => setFieldValue('movement_date', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-description">Description</label>
            <div className="ui-form__field-input">
                <textarea id="money-movement-description" value={values.description || ''}                    
                    onChange={e => setFieldValue('description', e.target.value)}
                    onBlur={handleBlur}
                 />
            </div>
        </div>
        <div className="ui-form__field">
            <label className="ui-form__label w-100" htmlFor="money-movement-user-relation">User</label>
            <div className="ui-form__field-input">
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
                                    onChange={e => setFormState({ ...formState, newUserRel: { ...formState.newUserRel, percentage: e.target.value ? parseFloat(e.target.value) : null }})}
                                />
                            </td>
                            <td>
                                <i className="fas fa-plus" onClick={addNewUserRel} />
                            </td>
                        </tr>
                        {values.users_relation.map((ur, index) => {
                            return <tr key={`user-relation-${index}`}>
                                <td>
                                    {finance.users[ur.user].full_name}
                                </td>
                                <td>
                                    <input id="money-movement-user-relation" value={ur.percentage || ''}                    
                                        onChange={e => setUserPercentage(e.target.value ? parseFloat(e.target.value) : null, index)}
                                    />
                                </td>
                                <td>
                                    <i className="fas fa-plus" onClick={() => removeUserRel(index)} />
                                </td>                                
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>;
}

MoneyMovementForm.propTypes = {
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
    handleBlur: PropTypes.func,
    finance: PropTypes.object,
};

const connectedMoneyMovementForm = withFinance(MoneyMovementForm);
export { connectedMoneyMovementForm as MoneyMovementForm };
