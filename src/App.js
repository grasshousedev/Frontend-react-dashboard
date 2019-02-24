import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';


export default function App ({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div className="dashboard-content">
                        <Routes />
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

App.propTypes = {
  store: PropTypes.object.isRequired
};
