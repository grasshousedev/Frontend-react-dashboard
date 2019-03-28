import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export function BaseLogin({ username, password, isLoading, updateField, login, error }) {
    return <Fragment>
        <div className="ui-form__container ui-form__container--w100">
            <div className="ui-form__field">
                <div className="ui-form__label">Username</div>
                <div className="ui-form__field-input">
                    <input type="text"
                        onChange={(e) => updateField('username', e.target.value)}
                        value={username}
                        disabled={isLoading} />
                </div>
            </div>
            <div className="ui-form__field">
                <div className="ui-form__label">Password</div>
                <div className="ui-form__field-input">
                    <input type="password"
                        onChange={(e) => updateField('password', e.target.value)}
                        value={password}
                        disabled={isLoading} />
                </div>
            </div>
            <div>
                <button className="ui-button ui-button--positive"
                    onClick={login}>Login</button>
                {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
            </div>
        </div>
        {error && 
            <div>
                <h4>Error</h4>
                <div>{error.status}: {error.statusText}</div>
            </div>
        }
    </Fragment>;
}

export const baseLoginPropTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateField: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

BaseLogin.propTypes = baseLoginPropTypes;
