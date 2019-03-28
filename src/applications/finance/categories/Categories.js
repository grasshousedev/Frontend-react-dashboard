import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { PageHeader } from 'components/ui/PageHeader';
import { FINANCE_BASE_URL } from '../constants';
import { withFinance } from '../storeConnection';
import { CategoriesTree } from './CategoriesTree';

function Categories({ finance }) {
    const { categoriesTree } = finance;

    const controls = <Controls />;

    return <div>
        <PageHeader controls={controls}>Categories</PageHeader>
        <div  className="ui-page-body">
            (back to <Link to="/apps/finance">Finance home</Link>)
            Categories list ({categoriesTree.length} total main categories)
            <CategoriesTree categoriesTree={categoriesTree} />
        </div>
    </div>;
}

Categories.propTypes = {
    finance: PropTypes.object,
};

const connectedCategories = withRouter(withFinance(Categories));
export { connectedCategories as Categories };

function Controls({ category }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <Link
            to={`${FINANCE_BASE_URL}/categories/add`}
            className={`${baseClass} ui-button--primary`}
        >Add Category</Link>
    </Fragment>;
}

Controls.propTypes = {
    category: PropTypes.object,
};
