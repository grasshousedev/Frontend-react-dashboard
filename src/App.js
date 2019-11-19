import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import './App.scss';

import { SET_APPLICATION_INITIALIZED } from 'store/actions';
import { Dashboard } from './Dashboard';

import { store } from './store/store';
import { authenticationService } from './libs/authentication/authentication';
import { reducers as authReducers } from './libs/authentication/reducers';
import { reducers as financeReducers } from '@vzamboni/dashboard-finance/app/reducers';

store.registerReducer('authentication', authReducers.authentication);
store.registerReducer('finance', financeReducers.finance);


export default function App ({ autoLogin=false }) {
    useEffect(() => {
        store.dispatch({ type: SET_APPLICATION_INITIALIZED, initialized: true });

        // Try to auto login based on localStorage
        authenticationService.storageAutoLogin();
    }, []); // eslint-disable-line

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
            <ToastContainer className='toast-container' toastClassName="ui-toast" transition={Slide} />
        </Provider>
    );
};

App.propTypes = {
    autoLogin: PropTypes.bool,
};
