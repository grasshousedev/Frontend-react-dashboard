import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from "react-router-dom";

import { FullSectionLoader } from 'components/ui/Loader';

import './categories/categories.scss';

import { FINANCE_BASE_URL } from './constants';
import { withFinance } from './storeConnection';
import { preload } from './preload';
import { FinanceHome } from './FinanceHome';
import { CategoriesLanding } from './categories/CategoriesLanding';
import { ContextsLanding } from './contexts/ContextsLanding';

export { FINANCE_BASE_URL };

class FinanceLanding extends Component {
    state = {
        appInitialized: false
    }

    componentDidMount() {
        const { initialized } = this.props.finance;
        if (initialized) {
            this.setInitialized();
        } else {
            this.initialize();
        }
    }

    initialize = () => { preload().then(() => this.setInitialized()); }

    setInitialized = () => { this.setState({ appInitialized: true }); }

    render() {
        const { appInitialized } = this.state;

        if (!appInitialized) {
            return <FullSectionLoader />;
        }

        return <Switch>
            <Route exact path={FINANCE_BASE_URL} component={FinanceHome} />
            <Route path={`${FINANCE_BASE_URL}/categories`} component={CategoriesLanding} />
            <Route path={`${FINANCE_BASE_URL}/contexts`} component={ContextsLanding} />
        </Switch>;
    }
}

FinanceLanding.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const ConnectedFinanceLanding = withRouter(withFinance(FinanceLanding));
export { ConnectedFinanceLanding as FinanceLanding };