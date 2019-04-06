import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { PageHeader } from 'components/ui/PageHeader';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FINANCE_BASE_URL } from '../constants';
import { withFinance } from '../storeConnection';
import { ContextEntity, newContext } from '../models/context';
import { getCurrentUser } from 'libs/authentication/utils';
import { ContextForm } from './ContextForm';

function ContextPageForm({ match, history, finance }) {
    const { contexts } = finance;    
    const loggedUser = getCurrentUser();

    const initialContext = match.params && match.params.id
        ? contexts[+match.params.id] || newContext()
        : newContext();

    const [context, setContext] = useState(initialContext);

    return <Formik
        enableReinitialize={true}
        initialValues={{ ...context }}
        onSubmit={(values, { setSubmitting }) => {
            const contextObj = new ContextEntity();
            contextObj.save(values).then(response => {
                setContext(response);
                setSubmitting(false);
                history.push(`${FINANCE_BASE_URL}/contexts`);
            });
        }}
    >
        {props => {
            const { values, isSubmitting, handleSubmit, setSubmitting } = props;

            const deleteContext = () => {
                const contextObj = new ContextEntity();
                setSubmitting(true);
                contextObj.delete(context.id).then(() => {
                    setSubmitting(false);
                    history.push(`${FINANCE_BASE_URL}/contexts`);
                });
            };

            const controls = <Controls
                isSubmitting={isSubmitting}
                deleteContext={initialContext.id ? deleteContext : null}
            />;
            return <form onSubmit={handleSubmit}>  
                <PageHeader controls={controls}>
                    <Link to={`${FINANCE_BASE_URL}/contexts`}
                        className={`ui-page-header ui-page-header__breadcrumb`}
                    >Contexts</Link>
                    {context.id ? `Edit ${context.full_name}` : 'Add Context'}
                </PageHeader>
                <div className='ui-page-body ui-section'>
                    <ContextForm {...props} context={context} />
                </div>
                {loggedUser.is_superuser && <CodeHighlight>
                    {JSON.stringify(values, null, 2)}
                </CodeHighlight>}
            </form>;
        }}
    </Formik>;
}

ContextPageForm.propTypes = {
    finance: PropTypes.object,
};

const connectedContextPageForm = withRouter(withFinance(ContextPageForm));
export { connectedContextPageForm as ContextPageForm };

function Controls({ isSubmitting, deleteContext }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        {deleteContext &&
            <button
                disabled={isSubmitting ? true : false}
                onClick={() => deleteContext()}
                className={`${baseClass} ui-button--negative`}
            >Delete</button>
        }
        <Link
            to={`${FINANCE_BASE_URL}/contexts`}
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
    deleteContext: PropTypes.func,
};

