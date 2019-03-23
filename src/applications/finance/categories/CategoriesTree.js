import React from 'react';
import PropTypes from 'prop-types';

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
        {treeNode.category.name}
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