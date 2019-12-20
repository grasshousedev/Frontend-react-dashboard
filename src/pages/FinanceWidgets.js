import React, { useEffect, useState } from 'react';

import { getRequest } from 'libs/requests/requests';
import { Icon } from 'components/ui/Icon';
import { FullSectionLoader } from 'components/ui/Loader';
import { Block } from 'components/ui/Blocks';


export function FinanceWidgets() {
    const [state, setState] = useState();

    useEffect(() => {
        getRequest('finance/api/user-stats').then(response => {
            setState(response);
        });
    }, []);

    if (!state) {
        return <FullSectionLoader />;
    }

    const isUnderBudget = state.totals.current_month.total * -1 < state.totals.current_month.budget;
    const isIncreased = state.totals.current_month.total < state.totals.previous_month.total;

    return <Block isOutstanding={true}>
        <div className="widgets__container">
            <div className="widget">
                <div className="widget__title widget__title--margin">Current Month</div>
                <div className="widget__value">
                    {isIncreased && <Icon size="big" name="keyboard_arrow_up" className="color-negative" />}
                    {!isIncreased && <Icon size="big" name="keyboard_arrow_down" className="color-positive" />}
                    <span className={isUnderBudget ? 'color-positive' : 'color-negative'}>{state.totals.current_month.total * -1}</span>
                    <span style={{ width: 20 }} />
                </div>
                <div className="widget__message">Budget: {state.totals.current_month.budget}</div>
            </div>
            <div className="widget">
                <div className="widget__title widget__title--margin">Previous Month</div>
                <div className="widget__value">
                    {state.totals.previous_month.total * -1}
                </div>
            </div>
        </div>
    </Block>;

}