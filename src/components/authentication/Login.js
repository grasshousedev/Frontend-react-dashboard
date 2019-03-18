import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authenticationService } from 'libs/authentication/authentication';
import { withAuthentication } from 'libs/authentication/storeConnection';

import { BaseLogin } from './BaseLogin';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            error: null,
        };
    }

    updateField = (field, value) => {
        this.setState({ [field]: value });
    }

    login = () => {        
        const { username, password } = this.state;

        this.setState(
            () => {
                return { isLoading: true, error: false };
            },
            () => {
                authenticationService.requestAuthentication(username, password)
                    .then(() => {
                        this.setState({ isLoading: false });
                    })
                    .catch(exception => {
                        this.setState({ isLoading: false, error: exception.getErrorData() });
                    });
            }
        );
    }

    render() {
        const { authentication, loginComponent } = this.props;
        const { isLoading, username, password, error } = this.state;

        if (authentication.loggedIn) { 
            return  <div className="ui-section">
                <div className="ui-section__column">
                    <div>You are logged in.</div>
                </div>
                <div className="ui-section__column w200">
                    <button className="button button--negative"
                        onClick={authenticationService.logout}>Logout</button>
                </div>
            </div>;
        }

        const LoginRenderComponent = loginComponent ? loginComponent : BaseLogin;

        return <div>           
            {/* eslint-disable-next-line */}
            <form action="javascript:void(0)">
                <LoginRenderComponent
                    username={username} password={password}
                    isLoading={isLoading}
                    login={this.login}
                    updateField={this.updateField}
                    error={error}
                />
            </form>
        </div>;
    }
};

Login.propTypes = {
    authentication: PropTypes.object,
    loginComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const connectedLogin = withAuthentication(Login);
export { connectedLogin as Login };
