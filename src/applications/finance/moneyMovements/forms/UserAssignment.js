import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function UserAssignment({ users, usersRef, values, addNewUserRel, removeUserRel, setUserPercentage, disabled }) {
    const [state, setState] = useState({
        newUserRel: {}
    });

    return <table>
        <thead>
            <tr>
                <th className="p-b-5">User</th>
                <th className="p-b-5">Percentage</th>
                <th width="30"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <select value={state.newUserRel.user || ''}
                        className="ui-form-v__select"
                        disabled={disabled}
                        onChange={e => setState({ ...state, newUserRel: { ...state.newUserRel, user: e.target.value ? +e.target.value : null }})}
                    >
                        <option value={null}>No split</option>
                        {users.map(user => {
                            return <option value={user.id} key={user.id}>{user.full_name}</option>;
                        })}
                    </select>
                </td>
                <td>
                    <input value={state.newUserRel.percentage || ''}                
                        className="ui-form-v__input" 
                        disabled={disabled}   
                        onChange={e => setState({ ...state, newUserRel: { ...state.newUserRel, percentage: e.target.value ? parseFloat(e.target.value) : null }})}
                    />
                </td>
                <td>
                    {!disabled && <i className="fas fa-plus icon-control" onClick={() => {
                        addNewUserRel(state.newUserRel);
                        setState({ ...state, newUserRel: {} });
                     }} />}
                </td>
            </tr>
            {values.users_relation.map((ur, index) => {
                return <tr key={`user-relation-${index}`}>
                    <td>
                        {usersRef[ur.user].full_name}
                    </td>
                    <td>
                        <input value={ur.percentage || ''}  
                            className="ui-form-v__input" 
                            disabled={disabled}                 
                            onChange={e => setUserPercentage(e.target.value ? parseFloat(e.target.value) : null, index)}
                        />
                    </td>
                    <td>
                        {!disabled && <i className="fas fa-minus icon-control" onClick={() => removeUserRel(index)} />}
                    </td>                                
                </tr>;
            })}
        </tbody>
    </table>;
}

UserAssignment.propTypes = {
    users: PropTypes.array,
    usersRef: PropTypes.object,
    values: PropTypes.object,
    addNewUserRel: PropTypes.func,
    removeUserRel: PropTypes.func,
    setUserPercentage: PropTypes.func,
    disabled: PropTypes.bool,
};

UserAssignment.defaultProps = {
    disabled: false
};
