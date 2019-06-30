import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Grid } from 'components/grid/Grid';
import { ModalTrigger } from 'components/ui/Modal';
import { MoneyMovementDetail } from './MoneyMovementDetail';
import { withFinance } from '../storeConnection';
import { FINANCE_BASE_URL } from '../constants';

function MoneyMovementsGrid({ moneyMovements, finance }) {
    const mmColumns = ['actions', 'movement_icon', 'amount', 'movement_date', 'category', 'description', 'tags', 'id'];
    const mmColumnsLabel = { actions: '', movement_icon: '', movement_date: 'Date' };
    const mmColumnsWidth = { actions: 30, movement_icon: 30, amount: 70, movement_date: 90, category: 180, description: 300, tags: 200, id: 30 };
    const mmRows = moneyMovements
        .sort((mm1, mm2) => mm1.movement_date > mm2.movement_date ? -1 : 1)
        .map(mm => ({
            ...mm,
            category: <Link to={`${FINANCE_BASE_URL}/categories/${mm.category}`}>{finance.categories[mm.category].full_name}</Link>,
            movement_icon: mm.movement === '-' ? <i className="fas fa-arrow-down red" /> : <i className="fas fa-arrow-up teal" />,
            actions: <Fragment>
                <ModalTrigger 
                    Trigger={({ setViewModalWindow }) => <i className="far fa-file-alt cursor-pointer" onClick={() => setViewModalWindow(true)} />}
                    getModalWindowProps={({ setViewModalWindow }) => {
                        return {
                            title: 'Money Movement Detail',
                            content: <MoneyMovementDetail moneyMovement={mm} />,
                            footer: <Fragment>
                                <div></div>
                                <div> 
                                    <Link
                                        to={`${FINANCE_BASE_URL}/money-movements/${mm.id}/edit`}
                                        className="ui-button ui-button--small"
                                    >Edit</Link>
                                    <button
                                        className="ui-button ui-button--primary ui-button--small"
                                        style={{ marginLeft: '1rem' }}
                                        onClick={() => setViewModalWindow(false)}
                                    >Close</button>
                                </div>
                            </Fragment>
                        };
                    }}
                />
            </Fragment>
        }));

    return <Grid
        rows={mmRows}
        columns={mmColumns}
        columnsWidth={mmColumnsWidth}
        columnsLabel={mmColumnsLabel}
        customCellClass={{ amount: 'finance__money-movement__amount-cell' }}
        autoHeightRows={mmRows.length > 10 ? null : mmRows.length + 2}
        height={null}        
    />;
}

MoneyMovementsGrid.propTypes = {
    moneyMovements: PropTypes.array,
    finance: PropTypes.object.isRequired,
};

const connectedMoneyMovementsGrid = withFinance(MoneyMovementsGrid);
export { connectedMoneyMovementsGrid as MoneyMovementsGrid };

