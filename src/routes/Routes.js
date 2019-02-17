import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import { Home } from 'components/Home';
import { Landing as MachineLearningLanding } from 'applications/machine-learning/Landing';

export class Routes extends Component {

    render() {
        return <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/machine-learning" component={MachineLearningLanding} />
        </Switch>;        
    }
}