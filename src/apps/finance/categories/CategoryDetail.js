import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { FullSectionLoader } from 'components/ui/Loader';
import { PageHeader } from 'components/ui/PageHeader';

import { withFinance } from '../storeConnection';
import { MoneyMovementEntity } from '../models/moneyMovement';
import { FINANCE_BASE_URL } from '../FinanceLanding';
import { CategoryLineChart, CategoryMonthlyChart } from './CategoryCharts';
import { MoneyMovementsGrid } from '../moneyMovements/MoneyMovementsGrid';


function CategoryDetail({ match, finance }) {
    const [moneyMovements, setMoneyMovements] = useState(null);
    
    const initialMovements = finance.moneyMovements;

    const categoryId = +match.params.id;
    const category = finance.categories[categoryId];

    useEffect(() => {
        const mmEntity = new MoneyMovementEntity();
        const categoriesId = [categoryId, ...finance.subCategoriesTree[categoryId] || []];
        if (Object.keys(initialMovements).length === 0) {
            mmEntity.fetch().then(loadedMoneyMovements => {
                setMoneyMovements(mmEntity.getByCategories(categoriesId, loadedMoneyMovements));
            });
        } else {
            setMoneyMovements(mmEntity.getByCategories(categoriesId, Object.values(initialMovements)));
        }
    }, []); // eslint-disable-line

    if (moneyMovements === null) {
        return <FullSectionLoader />;
    }

    const controls = <Link
        to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`}
        className="ui-button ui-button--primary"
    >Edit</Link>;    

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Finance</Link>
            <Link to={`${FINANCE_BASE_URL}/categories`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Categories</Link>
            {category.full_name}
        </PageHeader>
        <div className="ui-page-body">
            <CategoryLineChart category={category} moneyMovements={moneyMovements} chartStyle={{ marginBottom: '1rem' }} />
            <CategoryMonthlyChart category={category} moneyMovements={moneyMovements} chartStyle={{ marginBottom: '1rem' }} />
            <MoneyMovementsGrid moneyMovements={moneyMovements} />
        </div>
    </div>;

}

CategoryDetail.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const connectedCategoryDetail = withRouter(withFinance(CategoryDetail));
export { connectedCategoryDetail as CategoryDetail };