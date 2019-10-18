import React from 'react';
import PropTypes from 'prop-types';


export function Block({ children, title, isSeparated=true, isOutstanding=false }) {
    const separated = isSeparated ? 'ui-block--separated' : '';
    const outstanding = isOutstanding ? 'ui-block--outstanding' : '';
    const className = `ui-block ${separated} ${outstanding}`;

    return <div className={className}>
        {title && typeof title === 'string' && <h2 className="ui-title">{title}</h2>}
        {title && typeof title !== 'string' && {title}}
        {children}
    </div>;
}

Block.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    isSeparated: PropTypes.bool,
    isOutstanding: PropTypes.bool,
};


export function RowBlock({ children }) {
    return <div className="row">
        {children}
    </div>;
}

RowBlock.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};


export function ColumnBlock({ children, size=6, className='' }) {
    const colClassName = className ? className : `col-xs-12 col-sm-${size}`;

    return <div className={colClassName}>
        {children}
    </div>;
}

ColumnBlock.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    size: PropTypes.number,
    className: PropTypes.string,
};
