import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch, withRouter } from "react-router-dom";

import { FullSectionLoader } from 'components/ui/Loader';
import { Categories } from './categories/Categories';
import { withFinance } from './storeConnection';
import { preload } from './preload';

function Landing() {
    return <div className="dashboard-ui__page-body__container">
        <h2>Finance</h2>
        <p>This is the landing page of Finance module.</p>
        <div>
            Click here to view all <Link to={'/apps/finance/categories'}>Categories</Link>
        </div>
    </div>;
};

const RouterLanding = withRouter(Landing);

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
        const { match } = this.props;

        const { appInitialized } = this.state;

        if (!appInitialized) {
            return <FullSectionLoader />;
        }

        return <Switch>
            <Route exact path={match.url} component={RouterLanding} />
            <Route path={match.url + '/categories'} component={Categories} />
        </Switch>;
    }
}

FinanceLanding.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const ConnectedFinanceLanding = withRouter(withFinance(FinanceLanding));
export { ConnectedFinanceLanding as FinanceLanding };