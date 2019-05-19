import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { PageHeader } from 'components/ui/PageHeader';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FINANCE_BASE_URL } from '../constants';
import { withFinance } from '../storeConnection';
import { moneyMovementsEntity, newMoneyMovement } from '../models/moneyMovement';
import { getCurrentUser } from 'libs/authentication/utils';
import { MoneyMovementForm } from './MoneyMovementForm';
import { postRequest } from 'libs/requests/requests';
import { categoriesEntity } from '../models/category';

function MoneyMovementFormPage({ match, history, finance }) {
    const { moneyMovements } = finance;    
    const loggedUser = getCurrentUser();

    const initialMoneyMovement = match.params && match.params.id
        ? moneyMovements[+match.params.id] || newMoneyMovement()
        : newMoneyMovement();

    const [moneyMovement, setMoneyMovement] = useState(initialMoneyMovement);

    return <Formik
        enableReinitialize={true}
        initialValues={{ ...moneyMovement }}
        onSubmit={(values, { setSubmitting }) => {
            moneyMovementsEntity.save(values).then(response => {
                setMoneyMovement(response);
                setSubmitting(false);
                postRequest(`finance/api/category/calculate-totals/`, {}).then(resp => {
                    categoriesEntity.get(response.category).then(() => {
                        history.push(`${FINANCE_BASE_URL}/money-movements`);
                    });
                });
            }).catch(() => {
                setSubmitting(false);
            });
        }}
    >
        {props => {
            const { values, isSubmitting, handleSubmit, setSubmitting } = props;

            const deleteMoneyMovement = () => {                
                setSubmitting(true);
                moneyMovementsEntity.delete(moneyMovement.id).then(() => {
                    setSubmitting(false);
                    history.push(`${FINANCE_BASE_URL}/money-movements`);
                });
            };

            const controls = <Controls
                isSubmitting={isSubmitting}
                deleteMoneyMovement={initialMoneyMovement.id ? deleteMoneyMovement : null}
            />;
            return <form onSubmit={handleSubmit}>  
                <PageHeader controls={controls}>
                    <Link to={`${FINANCE_BASE_URL}/money-movements`}
                        className={`ui-page-header ui-page-header__breadcrumb`}
                    >Contexts</Link>
                    {moneyMovement.id ? `Edit Money Movement` : 'Add Money Movement'}
                </PageHeader>
                <div className='ui-page-body ui-section'>
                    <MoneyMovementForm {...props} moneyMovement={moneyMovement} />
                </div>
                {loggedUser.is_superuser && <CodeHighlight>
                    {JSON.stringify(values, null, 2)}
                </CodeHighlight>}
            </form>;
        }}
    </Formik>;
}

MoneyMovementFormPage.propTypes = {
    finance: PropTypes.object,
};

const connectedMoneyMovementFormPage = withRouter(withFinance(MoneyMovementFormPage));
export { connectedMoneyMovementFormPage as MoneyMovementFormPage };

function Controls({ isSubmitting, deleteMoneyMovement }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        {deleteMoneyMovement &&
            <button
                disabled={isSubmitting ? true : false}
                onClick={() => deleteMoneyMovement()}
                className={`${baseClass} ui-button--negative`}
            >Delete</button>
        }
        <Link
            to={`${FINANCE_BASE_URL}/money-movements`}
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
    deleteMoneyMovement: PropTypes.func,
};

