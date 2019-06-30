import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";

import { FullSectionLoader } from 'components/ui/Loader';

import './categories/categories.scss';

import { FINANCE_BASE_URL } from './constants';
import { withFinance } from './storeConnection';
import { PageHeader } from 'components/ui/PageHeader';

export { FINANCE_BASE_URL };

function FinanceHome() {

    const [homeState, setHomeState] = useState({
        loading: true,
    });

    useEffect(() => {
        setHomeState({ ...homeState, loading: false });
    }, []); // eslint-disable-line

    const { loading } = homeState;

    if (loading) return <FullSectionLoader />;

    return <Fragment>
        <PageHeader>Finance</PageHeader>        
        <div className="ui-page-body">
            <p>This is the landing page of Finance module.</p>
            <div>
                Click here to view all <Link to={'/apps/finance/categories'}>Categories</Link>
            </div>
            <div>
                Click here to view all <Link to={'/apps/finance/contexts'}>Contexts</Link>
            </div>
            <div>
                Click here to view all <Link to={'/apps/finance/money-movements'}>Money Movements</Link>
            </div>
        </div>
    </Fragment>;
};

const connectedFinanceHome = withRouter(withFinance(FinanceHome));
export { connectedFinanceHome as FinanceHome };
