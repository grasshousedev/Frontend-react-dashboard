import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Contexts } from './Contexts';
import { FINANCE_BASE_URL } from '../constants';
import { ContextPageForm } from './ContextPageForm';

function ContextsLanding() {
    return <Switch>
        <Route exact path={`${FINANCE_BASE_URL}/contexts`} component={Contexts} />
        <Route exact path={`${FINANCE_BASE_URL}/contexts/add`} component={ContextPageForm} />
        <Route exact path={`${FINANCE_BASE_URL}/contexts/:id/edit`} component={ContextPageForm} />
    </Switch>;
}

const connectedContextsLanding = withRouter(ContextsLanding);
export { connectedContextsLanding as ContextsLanding };
