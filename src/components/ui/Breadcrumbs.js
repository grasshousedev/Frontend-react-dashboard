import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { propTypeChildren } from '../utils';


const BREADCRUMBS_CLASS = 'ui-breadcrumbs';
const BREADCRUMBS_CONTAINER_CLASS = `${BREADCRUMBS_CLASS}__container`;
const BREADCRUMBS_BREADCRUMB_CLASS = `${BREADCRUMBS_CLASS}__breadcrumb`;
const BREADCRUMBS_SEPARATOR_CLASS = `${BREADCRUMBS_CLASS}__separator`;


export function Breadcrumbs({ breadcrumbs, className, children, ...rest }) {
    const generatedBreadcrumbs = breadcrumbs ? generateBreadcrumbs(breadcrumbs) : null;
    const breadcrumbsClass = `${BREADCRUMBS_CONTAINER_CLASS} ${className}`;

    return <div className={breadcrumbsClass} {...rest}>
        {generatedBreadcrumbs}
        {children}
    </div>;
}

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
    })),
    className: PropTypes.string,
    children: propTypeChildren,
};

Breadcrumbs.Breadcrumb = Breadcrumb;
Breadcrumbs.Separator = Separator;


function Breadcrumb({ link, onClick, isLast, className, children, ...rest }) {
    const Tag = link ? Link : 'div';
    const clickableClass = link || onClick ? `${BREADCRUMBS_BREADCRUMB_CLASS}--clickable` : '';
    const lastClass = isLast ? `${BREADCRUMBS_BREADCRUMB_CLASS}--last` : '';
    const breadcrumbClass = `${BREADCRUMBS_BREADCRUMB_CLASS} ${clickableClass} ${lastClass} ${className}`;

    return <Tag className={breadcrumbClass} onClick={onClick} to={link} {...rest}>{children}</Tag>;
}

Breadcrumb.propTypes = {
    link: PropTypes.string,
    onClick: PropTypes.func,
    isLast: PropTypes.bool,
    className: PropTypes.string,
    children: propTypeChildren,
};


function Separator() {
    return <div className={BREADCRUMBS_SEPARATOR_CLASS}>&raquo;</div>;
}


function generateBreadcrumbs(breadcrumbs) {
    return breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length;
        return <Fragment key={`breadcrumb-${index}`}>
            {index > 0 && <Separator />}
            <Breadcrumb
                link={breadcrumb.link}
                isLast={isLast}
                className={breadcrumb.className}
            >
                {breadcrumb.label}
            </Breadcrumb>
        </Fragment>;
    });
}