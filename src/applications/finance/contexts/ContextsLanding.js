import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Contexts } from './Contexts';
import { FINANCE_BASE_URL } from '../constants';

function ContextsLanding() {
    return <Switch>
        <Route exact path={`${FINANCE_BASE_URL}/contexts`} component={Contexts} />
    </Switch>;
}

const connectedContextsLanding = withRouter(ContextsLanding);
export { connectedContextsLanding as ContextsLanding };
