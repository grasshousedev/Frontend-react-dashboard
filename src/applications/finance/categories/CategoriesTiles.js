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
                : "No subcategories";            
            const controls = <Fragment>
                <Link to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`} className="ui-card__control">View details</Link>
                <Link to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`} className="ui-button ui-button--primary">Edit</Link>
            </Fragment>;
            return <div key={category.id} className="col-xs-12 col-sm-6 col-lg-4" style={{ padding: 0 }}>
                <Card
                    styles={{ container: { width: "calc(100% - 10px)" } }}
                    colors={color ? { side: color, icon: color } : {}}
                    title={<Link to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`}>{category.name}</Link>}
                    icon={<Link to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`}><i className={`fas fa-3x ${category.attributes_ui.icon || 'fa-tree'}`} /></Link>}
                    description={subcategories}
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
        to={`${FINANCE_BASE_URL}/categories/${category.id}/edit`}        
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
