import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FINANCE_BASE_URL } from '../constants';
import { Card } from 'components/ui/Cards';

export function CategoriesTiles({ categoriesTree }) {
    if (categoriesTree.length === 0) return '';

    return <div className="row finance__categories__tiles">
        {categoriesTree.map(treeNode => {
            const category = treeNode.category;
            const color = category.attributes_ui.color || undefined;
            const subcategories = treeNode.children.length > 0
                ? <CategorySubcategories treeNode={treeNode} />
                : <div>No subcategories</div>;     
            const description = <Fragment>
                {subcategories}
                <CategoryTotal category={category} />
            </Fragment>;
            const controls = <Fragment>
                <Link to={`${FINANCE_BASE_URL}/categories/${category.id}`} className="ui-card__control">View details</Link>
                <Link to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`} className="ui-button ui-button--primary">Edit</Link>
            </Fragment>;
            return <div key={category.id} className="col-xs-12 col-sm-6 col-lg-4" style={{ padding: 0 }}>
                <Card
                    styles={{ container: { width: "calc(100% - 10px)" } }}
                    colors={color ? { side: color, icon: color } : {}}
                    title={<Link to={`${FINANCE_BASE_URL}/categories/${category.id}`}>{category.name}</Link>}
                    icon={<Link to={`${FINANCE_BASE_URL}/categories/${category.id}`}><i className={`fas fa-3x ${category.attributes_ui.icon || 'fa-tree'}`} /></Link>}
                    description={description}
                    controls={controls}
                />
            </div>;
        })}
    </div>;
}

CategoriesTiles.propTypes = {
    categoriesTree: PropTypes.array,
};

function CategorySubcategories({ treeNode }) {
    const [viewSubcategories, setViewSubcategories] = useState(false);
    return <div>
        <span onClick={() => setViewSubcategories(!viewSubcategories)} className="cursor-pointer">{treeNode.children.length} subcategories (toggle)</span>
        {viewSubcategories &&
            <div className="ui-tiles__container ui-tiles--small">
                {treeNode.children.map(subTreeNode => {
                    return <CategoryTile key={subTreeNode.category.id} category={subTreeNode.category} />;
                })}    
            </div>
        }
    </div>;
}

CategorySubcategories.propTypes = {
    treeNode: PropTypes.object,
};

function CategoryTile({ category }) {
    return <Link className="ui-tiles__tile"
        to={`${FINANCE_BASE_URL}/categories/${category.id}`}        
    >
        <div className="ui-tiles__tile__icon">
            <i {...category.attributes_ui.color && { style: { color: `${category.attributes_ui.color}` } }}
                className={`fas ${category.attributes_ui.icon || 'fa-tree'}`} />
        </div>
        <div className="ui-tiles__tile__label">{category.name}</div>            
    </Link>;
}

CategoryTile.propTypes = {
    category: PropTypes.object,
};

function CategoryTotal({ category }) {
    const total = category.user_data && category.user_data.totals && category.user_data.totals.total;
    if (!total) return '';

    const posNegClass = `finance__categories__tiles__total--${total > 0 ? 'positive' : 'negative'}`;
    const posNegIcon = `finance__categories__tiles__total__icon--${total > 0 ? 'positive fa-arrow-up' : 'negative fa-arrow-down'}`;

    return <div className="finance__categories__tiles__total__container">
        <div className={`finance__categories__tiles__total ${posNegClass}`}>{total}</div>
        <i className={`fas fa-2x ${posNegIcon}`} />
    </div>;
}

CategoryTotal.propTypes = {
    category: PropTypes.object,
};

