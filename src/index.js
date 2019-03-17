// Libraries
import React from 'react';
import { render } from 'react-dom';

// styles
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'typeface-roboto';

import App from './App';
import { store } from './store/store';
import { authenticationService } from './libs/authentication/authentication';
import { STORAGE_LOGIN_ATTEMPT } from 'libs/authentication/actions';
import { reducers as authReducers } from './libs/authentication/reducers';

store.registerReducer('authentication', authReducers.authentication);

render(
    <App store={store} />,
    document.getElementById('root')
);

// Try to auto login based on localStorage
authenticationService.getStorageLoggedUserToken().then(data => {
    if (data.token) {
        authenticationService.getLoggedUser();
    }
    store.dispatch({ type: STORAGE_LOGIN_ATTEMPT, value: true });
});