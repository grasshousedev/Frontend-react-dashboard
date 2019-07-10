import React from 'react';
import PropTypes from 'prop-types';

import { Login } from 'components/authentication/Login';
import { withAuthentication } from 'libs/authentication/storeConnection';

function User ({ authentication }) {

    return <div className="ui-page-body">
        {authentication.loggedIn && <h2>Hello {authentication.user.first_name}, welcome!</h2>}
        {!authentication.loggedIn && <h2>Login</h2>}
        <Login />
    </div>;
}
User.propTypes = {
    authentication: PropTypes.object,
};

export const ConnectedUser = withAuthentication(User);
