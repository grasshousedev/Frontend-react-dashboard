import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { MoneyMovements } from './MoneyMovements';
import { FINANCE_BASE_URL } from '../constants';
import { MoneyMovementDetailPage } from './MoneyMovementDetailPage';

function MoneyMovementsLanding() {
    return <Switch>
        <Route exact path={`${FINANCE_BASE_URL}/money-movements`} component={MoneyMovements} />
        <Route exact path={`${FINANCE_BASE_URL}/money-movements/:id`} component={MoneyMovementDetailPage} />
    </Switch>;
}

const connectedMoneyMovementsLanding = withRouter(MoneyMovementsLanding);
export { connectedMoneyMovementsLanding as MoneyMovementsLanding };

