import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

export function Navigator ({ children, sections, selectedKey, position='right', sticky=true, ...rest }) {

    const stickyClass = sticky ? 'ui-navigator--sticky' : '';
    const navigatorClass = `ui-navigator ui-navigator--${position} ${stickyClass}`;

    const content = sections
        ? buildSections(sections, selectedKey)
        : children;

    return <div className={navigatorClass} {...rest}>
        {content}
    </div>;

}

Navigator.propTypes = {
    children: propTypeChildren,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    key: PropTypes.string.isRequired,
                    onClick: PropTypes.func,
                }),
            ).isRequired,
        }),
    ),
    selectedKey: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
    sticky: PropTypes.bool,
};


export function NavigatorTitle ({ children, ...rest }) {
    return <h3 className="ui-navigator__title" {...rest}>{children}</h3>;
}

NavigatorTitle.propTypes = {
    children: propTypeChildren,
};


export function NavigatorItem ({ children, isSelected, ...rest }) {
    const navigatorItemClass = `ui-navigator__item ${isSelected ? 'ui-navigator__item--selected' : ''}`;

    return <div className={navigatorItemClass} {...rest}>{children}</div>;
}

NavigatorItem.propTypes = {
    children: propTypeChildren,
    isSelected: PropTypes.bool,
};


function buildSections(sections, selectedKey) {
    return sections.map((section, index) => {
        return <Fragment key={index}>
            {section.title && <NavigatorTitle>{section.title}</NavigatorTitle>}
            {section.items.map(item => {
                return <NavigatorItem
                    key={item.key}
                    isSelected={item.key === selectedKey}
                    onClick={item.onClick}
                >{item.label}</NavigatorItem>;
            })}
        </Fragment>;
    });
}
