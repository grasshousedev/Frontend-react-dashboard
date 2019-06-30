import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FINANCE_BASE_URL } from '../constants';

export function CategoriesTree({ categoriesTree }) {
    if (categoriesTree.length === 0) return '';

    return <ul>
        {categoriesTree.map(treeNode => {
            return <CategoryTreeNode key={treeNode.category.id} treeNode={treeNode} />;
        })}
    </ul>;
}

CategoriesTree.propTypes = {
    categoriesTree: PropTypes.array,
};

function CategoryTreeNode({ treeNode }) {
    return <li>
        <Link to={`${FINANCE_BASE_URL}/categories/${treeNode.category.id}/edit`}>{treeNode.category.name}</Link>
        {treeNode.children.length > 0 &&
            <ul>
                {treeNode.children.map(subTreeNode => {
                    return <CategoryTreeNode key={subTreeNode.category.id} treeNode={subTreeNode} />;
                })}    
            </ul>
        }
    </li>;
}

CategoryTreeNode.propTypes = {
    treeNode: PropTypes.object,
};