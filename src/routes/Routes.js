import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import { Home } from 'pages/Home';
import { Landing as MachineLearningLanding } from 'applications/machine-learning/Landing';
import { StyleShowcase } from 'applications/style-showcase/StyleShowcase';
import { FinanceLanding, FINANCE_BASE_URL } from 'applications/finance/FinanceLanding';

function Routes() {
    return <Switch>
        <Route exact path="/" component={Home} />
        <Route path={`${FINANCE_BASE_URL}`} component={FinanceLanding} />
        <Route path="/machine-learning" component={MachineLearningLanding} />
        <Route path="/style-showcase" component={StyleShowcase} />
    </Switch>;        
}

const ConnectedRoutes = withRouter(Routes);
export { ConnectedRoutes as Routes };