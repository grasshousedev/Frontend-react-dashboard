import React from 'react';
import PropTypes from 'prop-types';

export function PageController({ pagination, setPagination, totEntries, config }) {
    // optional: if totEntries is not defined, show a spinner

    const currentPage = pagination.page;
    const pageSize = pagination.pageSize;
    const pageController = config.pageController || {};

    const totPages = Math.floor(totEntries / pageSize) + 1 * (totEntries % pageSize !== 0);
    const visiblePages = [];
    for (let i=Math.min(totPages - 4, currentPage - 2); i<=Math.max(currentPage + 2, 5); i++)
        if (i > 0 && i<= totPages) visiblePages.push(i);


    return <div className={`ui-table__page-controller__container ui-table__page-controller__container--${pageController.style}`}>
        <div className="ui-table__page-controller__navigation-container">
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pagination.page > 1) setPagination({ ...pagination, page: 1 }); }}
            >
                <i className="fas fa-backward" />
            </span>
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pagination.page > 1) setPagination({ ...pagination, page: pagination.page - 1 }); }}
            >
                <i className="fas fa-step-backward" />
            </span>
        </div>
        <div className="ui-table__page-controller">
            {visiblePages.map(page => {
                const className = 'ui-table__page-controller__page' +
                    (page === currentPage ? ' ui-table__page-controller__page--active' : '');

                return <span key={page}
                    className={className}
                    onClick={() => setPagination({ ...pagination, page })}
                >
                    {page}
                </span>;
            })}
        </div>
        <div className="ui-table__page-controller__navigation-container">
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pagination.page < totPages) setPagination({ ...pagination, page: pagination.page + 1 }); }}
            >
                <i className="fas fa-step-forward" />
            </span>
            <span className="ui-table__page-controller__page ui-table__page-controller__page--navigator"
                onClick={() => { if (pagination.page < totPages) setPagination({ ...pagination, page: totPages }); }}
            >
                <i className="fas fa-forward" />
            </span>
        </div>
    </div>;
}

PageController.propTypes = {
    pagination: PropTypes.object.isRequired,
    setPagination: PropTypes.func.isRequired,
    totEntries: PropTypes.number,
    config: PropTypes.object.isRequired,
};
