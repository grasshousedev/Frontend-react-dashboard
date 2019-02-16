import React, { Component } from 'react';

import { authentication } from 'libs/authentication/authentication';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
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
            () => { return { isLoading: true, error: null }; },
            () => {
                authentication.login(username, password)
                    .then(response => {
                        this.setState({ isLoading: false, loggedIn: true });
                    })
                    .catch(error => {
                        this.setState({ isLoading: false, error });
                    });
            }
        );
    }

    render() {
        const { isLoading, loggedIn, username, password } = this.state;

        if (loggedIn) { 
            return <h1>You are logged in!</h1>;
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
        </div>;
    }
};