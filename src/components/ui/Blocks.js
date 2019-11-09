import React from 'react';
import PropTypes from 'prop-types';

const UI_BLOCK_CLASS = 'ui-block';
const UI_TITLE_CLASS = 'ui-title';


export function Block({ children, title, isSeparated=true, isPadded=true, isOutstanding=false, isContentCentered=false }) {
    const separatedClass = isSeparated ? `${UI_BLOCK_CLASS}--separated` : '';
    const paddedClass = isPadded ? `${UI_BLOCK_CLASS}--padded` : '';
    const outstandingClass = isOutstanding ? `${UI_BLOCK_CLASS}--outstanding` : '';
    const contentCenteredClass = isContentCentered ? `${UI_BLOCK_CLASS}--content-centered` : '';
    const className = `${UI_BLOCK_CLASS} ${separatedClass} ${paddedClass} ${outstandingClass} ${contentCenteredClass}`;

    return <div className={className}>
        {title && typeof title === 'string' && <h2 className={UI_TITLE_CLASS}>{title}</h2>}
        {title && typeof title !== 'string' && {title}}
        {children}
    </div>;
}

Block.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    isSeparated: PropTypes.bool,
    isPadded: PropTypes.bool,
    isOutstanding: PropTypes.bool,
    isContentCentered: PropTypes.bool,
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
