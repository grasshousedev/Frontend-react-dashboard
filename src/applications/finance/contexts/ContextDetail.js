import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { FullSectionLoader } from 'components/ui/Loader';
import { PageHeader } from 'components/ui/PageHeader';

import { withFinance } from '../storeConnection';
import { moneyMovementsEntity } from '../models/moneyMovement';
import { FINANCE_BASE_URL } from '../FinanceLanding';
import { ContextCategoriesChart } from './ContextCharts';
import { MoneyMovementsGrid } from '../moneyMovements/MoneyMovementsGrid';


function ContextDetail({ match, finance }) {
    const [moneyMovements, setMoneyMovements] = useState(null);
    
    const contextId = +match.params.id;
    const context = finance.contexts[contextId];

    useEffect(() => {
        setMoneyMovements(moneyMovementsEntity.getByContext(contextId, Object.values(finance.moneyMovements)));
    }, []); // eslint-disable-line

    if (moneyMovements === null) {
        return <FullSectionLoader />;
    }

    const controls = <Link
        to={`${FINANCE_BASE_URL}/contexts/${context.id}/edit`}
        className="ui-button ui-button--primary"
    >Edit</Link>;    

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Finance</Link>
            <Link to={`${FINANCE_BASE_URL}/contexts`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Contexts</Link>
            {context.name}
        </PageHeader>
        <div className="ui-page-body">
            <ContextCategoriesChart context={context} moneyMovements={moneyMovements} categories={finance.categories} chartStyle={{ marginBottom: '1rem' }} />
            <MoneyMovementsGrid moneyMovements={moneyMovements} />
        </div>
    </div>;

}

ContextDetail.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const connectedContextDetail = withRouter(withFinance(ContextDetail));
export { connectedContextDetail as ContextDetail };