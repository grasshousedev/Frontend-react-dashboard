// Libraries
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


// styles
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'typeface-roboto';

import App from './App';
import initializeStore from './store/store';
import { reducers as authReducers } from './libs/authentication/reducers';

const store = initializeStore({
    auth: authReducers,
});

render(
    <Provider store={store}>
        <App />,
    </Provider>,    
    document.getElementById('root')
);
