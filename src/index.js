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
import { reducers as authReducers } from './libs/authentication/reducers';
import { reducers as financeReducers } from './applications/finance/reducers';

store.registerReducer('authentication', authReducers.authentication);
store.registerReducer('finance', financeReducers.finance);

render(
    <App store={store} />,
    document.getElementById('root')
);

// Try to auto login based on localStorage
authenticationService.storageAutoLogin();
