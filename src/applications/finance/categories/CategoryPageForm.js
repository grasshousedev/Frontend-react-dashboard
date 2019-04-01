import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { PageHeader } from 'components/ui/PageHeader';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FINANCE_BASE_URL } from '../constants';
import { withFinance } from '../storeConnection';
import { CategoryEntity, newCategory } from '../models/category';
import { getCurrentUser } from 'libs/authentication/utils';
import { CategoryForm } from './CategoryForm';

function getCategory(categories, id) {
    const category = categories.filter(c => c.id === id);
    if (category.length === 1) return category[0];
    return null;
}

function CategoryPageForm({ match, history, finance }) {
    const { categories } = finance;    
    const loggedUser = getCurrentUser();

    const initialCategory = match.params && match.params.id
        ? getCategory(categories, +match.params.id) || newCategory()
        : newCategory();

    const [category, setCategory] = useState(initialCategory);

    return <Formik
        enableReinitialize={true}
        initialValues={{ ...category }}
        onSubmit={(values, { setSubmitting }) => {
            const categoryObj = new CategoryEntity();
            categoryObj.save(values).then(response => {
                setCategory(response);
                setSubmitting(false);
                history.push(`${FINANCE_BASE_URL}/categories`);
            });
        }}
    >
        {props => {
            const { values, isSubmitting, handleSubmit, setSubmitting } = props;

            const deleteCategory = () => {
                const categoryObj = new CategoryEntity();
                setSubmitting(true);
                categoryObj.delete(category.id).then(() => {
                    setSubmitting(false);
                    history.push(`${FINANCE_BASE_URL}/categories`);
                });
            };

            const controls = <Controls isSubmitting={isSubmitting} deleteCategory={deleteCategory} />;
            return <form onSubmit={handleSubmit}>  
                <PageHeader controls={controls}>
                    <Link to={`${FINANCE_BASE_URL}/categories/`}
                        className={`ui-page-header ui-page-header__breadcrumb`}
                    >Categories</Link>
                    {category.id ? `Edit ${category.full_name}` : 'Add Category'}
                </PageHeader>
                <div className='ui-page-body ui-section'>
                    <CategoryForm {...props} category={category} />
                </div>
                {loggedUser.is_superuser && <CodeHighlight>
                    {JSON.stringify(values, null, 2)}
                </CodeHighlight>}
            </form>;
        }}
    </Formik>;
}

CategoryPageForm.propTypes = {
    finance: PropTypes.object,
};

const connectedCategoryPageForm = withRouter(withFinance(CategoryPageForm));
export { connectedCategoryPageForm as CategoryPageForm };

function Controls({ isSubmitting, deleteCategory }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <button
            disabled={isSubmitting ? true : false}
            onClick={() => deleteCategory()}
            className={`${baseClass} ui-button--negative`}
        >Delete</button>
        <Link
            to={`${FINANCE_BASE_URL}/categories`}
            className={`${baseClass}`}
        >Cancel</Link>
        <button
            disabled={isSubmitting ? true : false}
            type="submit"            
            className={`${baseClass} ui-button--positive`}
        >Save</button>
    </Fragment>;
}

Controls.propTypes = {
    isSubmitting: PropTypes.bool,
    deleteCategory: PropTypes.func,
};

