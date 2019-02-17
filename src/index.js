// Libraries
import React from 'react';
import { render } from 'react-dom';

// styles
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'typeface-roboto';

import App from './App';
import { store } from './store/store';
import { reducers as authReducers } from './libs/authentication/reducers';

store.registerReducer('authentication', authReducers.authentication);

render(
    <App store={store} />,
    document.getElementById('root')
);
