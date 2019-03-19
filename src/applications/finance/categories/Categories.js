import React from 'react';
import PropTypes from 'prop-types';

import { withFinance } from '../storeConnection';

function Categories({ match, finance }) {
    const { categories } = finance;
    
    return <div className="dashboard-ui__page-body__container">
        <h2>Categories</h2>
        Categories list ({categories.length} total)
        {categories.length > 0 && <ul>
            {categories.map(category => {
                return <li key={category.id}>{category.name}</li>;
            })}
        </ul>}
    </div>;
}

Categories.propTypes = {
    match: PropTypes.object,
    finance: PropTypes.object,
};

const connectedCategories = withFinance(Categories);
export { connectedCategories as Categories };