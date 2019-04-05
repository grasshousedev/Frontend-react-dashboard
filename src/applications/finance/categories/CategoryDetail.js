import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Grid } from 'components/grid/Grid';
import { FullSectionLoader } from 'components/ui/Loader';
import { PageHeader } from 'components/ui/PageHeader';

import { withFinance } from '../storeConnection';
import { MoneyMovementEntity } from '../models/moneyMovement';
import { FINANCE_BASE_URL } from '../FinanceLanding';
import { CategoryLineChart, CategoryMonthlyChart } from './CategoryCharts';


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

    const mmColumns = ['movement_icon', 'amount', 'movement_date', 'description', 'tags', 'id'];
    const mmColumnsLabel = { movement_icon: '', amount: 'Amount', movement_date: 'Date', description: 'Description', tags: 'Tags', id: 'ID' };
    const mmColumnsWidth = { movement_icon: 20, amount: 70, movement_date: 80, description: 400, tags: 200, id: 20 };
    const mmRows = Object.values(moneyMovements)
        .sort((mm1, mm2) => mm1.movement_date > mm2.movement_date ? -1 : 1)
        .map(mm => ({
            ...mm,
            movement_icon: mm.movement === '-' ? <i className="fas fa-arrow-down red" /> : <i className="fas fa-arrow-up teal" />
        }));

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}/categories/`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Categories</Link>
            {category.full_name}
        </PageHeader>
        <div className="ui-page-body">
            <CategoryLineChart category={category} moneyMovements={moneyMovements} chartStyle={{ marginBottom: '1rem' }} />
            <CategoryMonthlyChart category={category} moneyMovements={moneyMovements} chartStyle={{ marginBottom: '1rem' }} />
            <Grid
                rows={mmRows}
                columns={mmColumns}
                columnsWidth={mmColumnsWidth}
                columnsLabel={mmColumnsLabel}
                customCellClass={{ amount: 'finance__money-movement__amount-cell' }}
                autoHeightRows={mmRows.length > 10 ? 10 : mmRows.length + 2}
                height={null}
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