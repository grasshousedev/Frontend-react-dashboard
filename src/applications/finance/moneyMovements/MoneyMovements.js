import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PageHeader } from 'components/ui/PageHeader';

import { withFinance } from '../storeConnection';
import { FINANCE_BASE_URL } from '../constants';
import { MoneyMovementsGrid } from './MoneyMovementsGrid';

function MoneyMovements({ finance }) {
    const controls = <Controls />;
    const moneyMovements = Object.values(finance.moneyMovements)
        .sort((mm1, mm2) => mm1.movement_date > mm2.movement_date ? -1 : 1);
        
    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Finance</Link>
            Money Movements
        </PageHeader>
        <div  className="ui-page-body">                        
            <MoneyMovementsGrid moneyMovements={moneyMovements} />
        </div>
    </div>;
}

MoneyMovements.propTypes = {
    finance: PropTypes.object.isRequired,
};

const connectedMoneyMovements = withFinance(MoneyMovements);
export { connectedMoneyMovements as MoneyMovements };


function Controls() {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <Link
            to={`${FINANCE_BASE_URL}/money-movements/add`}
            className={`${baseClass} ui-button--primary`}
        >Add Money Movement</Link>
    </Fragment>;
}
