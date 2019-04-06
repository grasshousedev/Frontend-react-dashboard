import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PageHeader } from 'components/ui/PageHeader';

import { withFinance } from '../storeConnection';
import { FINANCE_BASE_URL } from '../constants';
import { ContextsTimeline } from './ContextsTimeline';

function Contexts({ finance }) {
    const controls = <Controls />;

    return <div>
        <PageHeader controls={controls}>
            <Link to={`${FINANCE_BASE_URL}`}
                className={`ui-page-header ui-page-header__breadcrumb`}
            >Finance</Link>
            Contexts
        </PageHeader>
        <div  className="ui-page-body">                        
            <ContextsTimeline contexts={finance.contexts} moneyMovements={finance.moneyMovements} />
        </div>
    </div>;
}

Contexts.propTypes = {
    finance: PropTypes.object.isRequired,
};

const connectedContexts = withFinance(Contexts);
export { connectedContexts as Contexts };


function Controls() {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <Link
            to={`${FINANCE_BASE_URL}/contexts/add`}
            className={`${baseClass} ui-button--primary`}
        >Add Context</Link>
    </Fragment>;
}

