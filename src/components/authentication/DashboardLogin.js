import React, { Fragment } from 'react';

import { Icon } from 'components/ui/Icon';

import { baseLoginPropTypes } from './BaseLogin';


export function DashboardLogin({ username, password, isLoading, updateField, login, error }) {
    return <Fragment>
        <div className="ui-form__container ui-form__container--w100">
            <div className="ui-form__field--vertical">
                <div className="ui-form__label--vertical">Username</div>
                <div className="ui-form__field-input--vertical">
                    <input type="text"
                        className="dashboard-login__input"
                        onChange={(e) => updateField('username', e.target.value)}
                        value={username}
                        disabled={isLoading} />
                </div>
            </div>
            <div className="ui-form__field--vertical">
                <div className="ui-form__label--vertical">Password</div>
                <div className="ui-form__field-input--vertical">
                    <input type="password"
                        className="dashboard-login__input"
                        onChange={(e) => updateField('password', e.target.value)}
                        value={password}
                        disabled={isLoading} />
                </div>
            </div>
            {error &&
                <div className="dashboard-login__error-container">
                    {error.status === 400 &&
                        <h4>Wrong username or password.</h4>
                    }
                    {error.status !== 400 &&
                        <div>{error.status}: {error.statusText}</div>
                    }
                </div>
            }
            <div className="dashboard-login__button-container">
                {isLoading && <Icon name="spinner" modifiers="fa-pulse" />}
                <button className="ui-button dashboard-login__button"
                    onClick={login}>Login</button>
            </div>
        </div>
    </Fragment>;
}


DashboardLogin.propTypes = baseLoginPropTypes;
