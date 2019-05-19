import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { dateToUI } from 'utils/dates';
import { Timeline } from 'components/ui/Timeline';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FINANCE_BASE_URL } from '../constants';

export function ContextsTimeline({ contexts, moneyMovements }) {
    const contextsList = Object.values(contexts)
        .sort((c1, c2) => c1.start_date > c2.start_date ? -1 : 1)
        .map(context => {
            const contextMoneyMovements = Object.values(moneyMovements).reduce((acc, mm) => {
                if (mm.context === context.id) acc[mm.id] = mm;
                return acc;
            }, {});
            return { title: dateToUI(context.start_date), content: <Content context={context} moneyMovements={contextMoneyMovements} /> };
        });

    return <Timeline events={contextsList} />;
}

ContextsTimeline.propTypes = {
    contexts: PropTypes.object.isRequired,
    moneyMovements: PropTypes.object.isRequired,
};


function Content({ context, moneyMovements }) {
    const titleStyle = context.attributes_ui.color ? { color: context.attributes_ui.color } : {};    

    return <div className="ui-text__padded">
        <Link to={`${FINANCE_BASE_URL}/contexts/${context.id}`}> 
            <h3 style={titleStyle} className="ui-title--top">{context.name}</h3>
        </Link>
        <div className="row">
            <div className="col-sm-12 col-md-6">
                <div className="neutral-light-d2" >
                    <i className="fas fa-calendar-alt neutral-light-d2" /> {dateToUI(context.start_date)}
                    {context.end_date && context.end_date !== context.start_date ? ` to ${dateToUI(context.end_date)}` : ''}
                </div>
                <div className="ui-text">
                    {context.description}
                </div>
            </div>
            <div className="col-xs-12 col-sm-6" style={{ textAlign: 'center' }}>
                <div className="finance__context__timeline__total__container">
                    <div className="finance__context__timeline__total">
                        {context.user_data.totals.total}
                    </div>
                </div>
            </div>
        </div>
        <CodeHighlight toggle={{ initial: false }}>{JSON.stringify(context, null, 4)}</CodeHighlight>
    </div>;
}

Content.propTypes = {
    context: PropTypes.object.isRequired,
    moneyMovements: PropTypes.object,
};
