import React from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';
import { withFinance } from '../storeConnection';

function Categories({ finance }) {
    const { categories } = finance;
    
    return <div className="dashboard-ui__page-body__container">
        <h2>Categories</h2>
        (back to <Link to="/apps/finance">Finance home</Link>)
        Categories list ({categories.length} total)
        {categories.length > 0 && <ul>
            {categories.map(category => {
                return <li key={category.id}>{category.name}</li>;
            })}
        </ul>}
    </div>;
}

Categories.propTypes = {
    finance: PropTypes.object,
};

const connectedCategories = withRouter(withFinance(Categories));
export { connectedCategories as Categories };