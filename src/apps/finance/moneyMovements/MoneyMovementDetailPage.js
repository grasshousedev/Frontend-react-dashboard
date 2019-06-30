import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { withFinance } from '../storeConnection';
import { PageHeader } from 'components/ui/PageHeader';
import { FINANCE_BASE_URL } from '../constants';
import { MoneyMovementDetail } from './MoneyMovementDetail';

function MoneyMovementDetailPage({ match, finance }) {
    const moneyMovementId = +match.params.id;
    const moneyMovement = finance.moneyMovements[moneyMovementId];

    const controls = <Link
        to={`${FINANCE_BASE_URL}/money-movements/${moneyMovement.id}/edit`}
        className="ui-button ui-button--primary"
    >Edit</Link>;    

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Finance</Link>
            <Link to={`${FINANCE_BASE_URL}/contexts`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Money Movements</Link>
            {moneyMovement.name}
        </PageHeader>
        <div className="ui-page-body">
            <MoneyMovementDetail moneyMovement={moneyMovement} />
        </div>
    </div>;
}

MoneyMovementDetailPage.propTypes = {
    match: PropTypes.object.isRequired,
    finance: PropTypes.object.isRequired,
};

const connectedMoneyMovementDetailPage = withRouter(withFinance(MoneyMovementDetailPage));
export { connectedMoneyMovementDetailPage as MoneyMovementDetailPage };

