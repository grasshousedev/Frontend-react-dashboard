import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticationService } from 'libs/authentication/authentication';

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
        const { authentication } = this.props;
        const { isLoading, username, password, error } = this.state;

        if (authentication.loggedIn) { 
            return <div className="page-body__container">
                <h2>Hello {authentication.user.first_name}, welcome!</h2>
                <div className="ui-section">
                    <div className="ui-section__column">
                        <div>You are logged in.</div>
                    </div>
                    <div className="ui-section__column w200">
                        <button className="button button--negative"
                            onClick={authenticationService.logout}>Logout</button>
                    </div>
                </div>
            </div>;
        }

        return <div>
            {/* eslint-disable-next-line */}
            <form action="javascript:void(0)">
                <div>
                    Username
                    <input type="text" onChange={(e) => this.updateField('username', e.target.value)} value={username} disabled={isLoading} />
                </div>
                <div>
                    Password
                    <input type="password" onChange={(e) => this.updateField('password', e.target.value)} value={password} disabled={isLoading} />
                </div>
                <div>
                    <button onClick={this.login}>Login</button>
                    {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
                </div>
            </form>
            {error && 
                <div>
                    <h4>Error</h4>
                    <div>{error.status}: {error.statusText}</div>
                </div>
            }
        </div>;
    }
};

Login.propTypes = {
    authentication: PropTypes.object,
};

function mapStateToProps(state) {
    const { authentication } = state;

    return {
        authentication
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };