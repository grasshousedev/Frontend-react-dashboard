import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { withFinance } from '../storeConnection';
import { FullSectionLoader } from 'components/ui/Loader';
import { MoneyMovementEntity } from '../models/moneyMovement';
import { PageHeader } from 'components/ui/PageHeader';
import { FINANCE_BASE_URL } from '../FinanceLanding';
import { Grid } from 'components/grid/Grid';

function CategoryDetail({ match, finance }) {
    const [moneyMovements, setMoneyMovements] = useState(null);
    
    const initialMovements = finance.moneyMovements;

    const categoryId = +match.params.id;
    const category = finance.categories[categoryId];

    useEffect(() => {
        const mmEntity = new MoneyMovementEntity();
        if (Object.keys(initialMovements).length === 0) {
            mmEntity.fetch().then(loadedMoneyMovements => {
                setMoneyMovements(mmEntity.getByCategory(categoryId, loadedMoneyMovements));
            });
        } else {
            setMoneyMovements(mmEntity.getByCategory(categoryId, Object.values(initialMovements)));
        }
    }, []);

    if (moneyMovements === null) {
        return <FullSectionLoader />;
    }

    const controls = <Link
        to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`}
        className="ui-button ui-button--primary"
    >Edit</Link>;

    const mmColumns = ['movement', 'amount', 'movement_date', 'description'];
    const mmColumnsLabel = { movement: '', amount: 'Amount', movement_date: 'Date', description: 'Description' };
    const mmColumnsWidth = { movement: 20, amount: 50, movement_date: 80, description: 200 };
    const mmRows = Object.values(moneyMovements).sort((mm1, mm2) => mm1.movement_date > mm2.movement_date ? 1 : -1);

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}/categories/`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Categories</Link>
            {category.full_name}
        </PageHeader>
        <div className="ui-page-body">
            <Grid
                rows={mmRows}
                columns={mmColumns}
                columnsWidth={mmColumnsWidth}
                columnsLabel={mmColumnsLabel}
            />
        </div>
    </div>;

}

CategoryDetail.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const connectedCategoryDetail = withRouter(withFinance(CategoryDetail));
export { connectedCategoryDetail as CategoryDetail };