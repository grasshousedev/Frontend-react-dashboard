import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import { PageHeader } from 'components/ui/PageHeader';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FINANCE_BASE_URL } from '../constants';
import { moneyMovementsEntity, newMoneyMovement } from '../models/moneyMovement';
import { getCurrentUser } from 'libs/authentication/utils';
import { MoneyMovementAddBatchForm } from './MoneyMovementAddBatchForm';
import { postRequest } from 'libs/requests/requests';
import { notify } from 'libs/notifications/notifications';
import { categoriesEntity } from '../models/category';

function MoneyMovementAddBatchFormPage({ match, history }) {
    const loggedUser = getCurrentUser();

    const initialState = {
        values: [newMoneyMovement(), newMoneyMovement(), newMoneyMovement()],
    };

    const [formState, setFormState] = useState(initialState);

    return <Formik
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
            const promises = [];
            formState.values.forEach(values => {
                if (values.movement_date) {
                    promises.push(moneyMovementsEntity.save(values));
                }
            });            
            if (promises.lenght === 0) {
                setSubmitting(false);
                return;
            }
            return Promise.all(promises).then(responses => {
                const totalMM = formState.values.length;
                const values = [...formState.values.map((v, index) => !!(responses[index] && responses[index].id) ? null : v)].filter(v => v); 
                setFormState({ ...formState, values });
                setSubmitting(false);
                postRequest(`finance/api/category/calculate-totals/`, {}).then(resp => {
                    categoriesEntity.fetch().then(() => {                        
                        if (values.length === 0) {
                            notify.success('All money movements added successfully.');
                            history.push(`${FINANCE_BASE_URL}/money-movements`);                            
                        } else if (totalMM > values.length) {
                            notify.success(`${totalMM - values.length} money movements added successfully.`);
                        }
                    });
                });
            }).catch(() => {
                console.log('Done with error :(');
                notify.error('Something went wrong, check the console.');
                setSubmitting(false);
            });
        }}
    >
        {props => {
            const { isSubmitting, handleSubmit } = props;
            const { values } = formState;

            const deleteMoneyMovement = (batchIndex) => {                
                setFormState({
                    ...formState,
                    values: [...formState.values.map((v, index) => index !== batchIndex ? v : null)].filter(v => v)
                });
            };

            const cloneMoneyMovement = (batchIndex) => {                
                const values = [];
                formState.values.forEach((v, index) => {
                    values.push(v);
                    if (index === batchIndex) values.push(JSON.parse(JSON.stringify(v)));
                });
                setFormState({ ...formState, values });
            };

            const addMoneyMovement = () => {
                setFormState({
                    ...formState,
                    values: [...formState.values, newMoneyMovement()]
                });
            };

            const setFieldValue = (field, batchIndex, value) => {
                const mmEdit = formState.values[batchIndex];
                mmEdit[field] = value;
                setFormState({
                    ...formState,
                    values: formState.values.map((mmValue, index) => index === batchIndex ? mmEdit : mmValue)
                });
            };

            const controls = <Controls
                isSubmitting={isSubmitting}                
            />;
            return <form onSubmit={handleSubmit}>  
                <PageHeader controls={controls}>
                    <Link to={`${FINANCE_BASE_URL}`}
                        className={`ui-page-header ui-page-header__breadcrumb`}
                    >Finance</Link>
                    <Link to={`${FINANCE_BASE_URL}/money-movements`}
                        className={`ui-page-header ui-page-header__breadcrumb`}
                    >Money Movements</Link>
                    Add Batch
                </PageHeader>
                <div className='ui-page-body ui-section'>
                    <MoneyMovementAddBatchForm {...props}
                        values={values}
                        setFieldValue={setFieldValue}
                        addMoneyMovement={addMoneyMovement}
                        cloneMoneyMovement={cloneMoneyMovement}
                        deleteMoneyMovement={deleteMoneyMovement}
                    />
                </div>
                {loggedUser.is_superuser && <CodeHighlight>
                    {JSON.stringify(values, null, 2)}
                </CodeHighlight>}
            </form>;
        }}
    </Formik>;
}

MoneyMovementAddBatchFormPage.propTypes = {
};

const connectedMoneyMovementAddBatchFormPage = withRouter(MoneyMovementAddBatchFormPage);
export { connectedMoneyMovementAddBatchFormPage as MoneyMovementAddBatchFormPage };

function Controls({ isSubmitting }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
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
};

