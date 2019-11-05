import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';


export function PageController({ pageState, setPageState, totEntries, config }) {
    // optional: if totEntries is not defined, show a spinner

    const currentPage = pageState.page;
    const pageSize = pageState.pageSize;
    const pageController = config.pageController || {};

    const totPages = Math.floor(totEntries / pageSize) + 1 * (totEntries % pageSize !== 0);
    const visiblePages = [];
    for (let i=Math.min(totPages - 4, currentPage - 2); i<=Math.max(currentPage + 2, 5); i++)
        if (i > 0 && i<= totPages) visiblePages.push(i);


    return <div className={`ui-table__page-controller__container ui-table__page-controller__container--${pageController.style}`}>
        <div className="ui-table__page-controller__navigation-container">
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pageState.page > 1) setPageState({ ...pageState, page: 1 }); }}
            >
                <Icon name="skip_previous" />
            </span>
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pageState.page > 1) setPageState({ ...pageState, page: pageState.page - 1 }); }}
            >
                <Icon name="keyboard_arrow_left" />
            </span>
        </div>
        <div className="ui-table__page-controller">
            {visiblePages.map(page => {
                const className = 'ui-table__page-controller__page' +
                    (page === currentPage ? ' ui-table__page-controller__page--active' : '');

                return <span key={page}
                    className={className}
                    onClick={() => setPageState({ ...pageState, page })}
                >
                    {page}
                </span>;
            })}
        </div>
        <div className="ui-table__page-controller__navigation-container">
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pageState.page < totPages) setPageState({ ...pageState, page: pageState.page + 1 }); }}
            >
                <Icon name="keyboard_arrow_right" />
            </span>
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pageState.page < totPages) setPageState({ ...pageState, page: totPages }); }}
            >
                <Icon name="skip_next" />
            </span>
        </div>
    </div>;
}

PageController.propTypes = {
    pageState: PropTypes.object.isRequired,
    setPageState: PropTypes.func.isRequired,
    totEntries: PropTypes.number,
    config: PropTypes.object.isRequired,
};
