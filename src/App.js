import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import './App.scss';

import { SET_APPLICATION_INITIALIZED } from 'store/actions';
import { Dashboard } from './Dashboard';

export default function App ({ store }) {
    useEffect(() => {
        store.dispatch({ type: SET_APPLICATION_INITIALIZED, initialized: true });
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
  store: PropTypes.object.isRequired
};
