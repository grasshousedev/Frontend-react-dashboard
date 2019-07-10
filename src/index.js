// Libraries
import React from 'react';
import { render } from 'react-dom';

// styles
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { store } from './store/store';
import { authenticationService } from './libs/authentication/authentication';
import { reducers as authReducers } from './libs/authentication/reducers';
import { reducers as financeReducers } from './apps/dashboard-finance/app/reducers';

store.registerReducer('authentication', authReducers.authentication);
store.registerReducer('finance', financeReducers.finance);

render(
    <App store={store} />,
    document.getElementById('root')
);

// Try to auto login based on localStorage
authenticationService.storageAutoLogin();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
