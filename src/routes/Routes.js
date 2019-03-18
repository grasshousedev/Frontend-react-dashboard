import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import { Home } from 'components/Home';
import { Landing as MachineLearningLanding } from 'applications/machine-learning/Landing';
import { StyleShowcase } from 'applications/style-showcase/StyleShowcase';
import { FinanceLanding } from 'applications/finance/FinanceLanding';

export class Routes extends Component {

    render() {
        return <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/apps/finance" component={FinanceLanding} />
            <Route path="/machine-learning" component={MachineLearningLanding} />
            <Route path="/style-showcase" component={StyleShowcase} />
        </Switch>;        
    }
}