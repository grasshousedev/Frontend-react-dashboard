import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Categories } from './Categories';
import { FINANCE_BASE_URL } from '../constants';

function CategoriesLanding() {
    return <Switch>
        <Route exact path={`${FINANCE_BASE_URL}/categories`} component={Categories} />
    </Switch>;
}

const connectedCategoriesLanding = withRouter(CategoriesLanding);
export { connectedCategoriesLanding as CategoriesLanding };
