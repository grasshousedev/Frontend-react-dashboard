import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

const UI_SIDEBAR_MENU_CLASS = `ui-sidebar-menu`;
const UI_SIDEBAR_MENU_TITLE_CLASS = `${UI_SIDEBAR_MENU_CLASS}__title`;
const UI_SIDEBAR_MENU_ENTRY_CLASS = `${UI_SIDEBAR_MENU_CLASS}__entry`;
const UI_SIDEBAR_MENU_SEPARATOR_CLASS = `${UI_SIDEBAR_MENU_CLASS}__separator`;


export function SidebarMenu({ children, isPadded=true }) {
    const paddedClass = isPadded ? `${UI_SIDEBAR_MENU_CLASS}--padded` : '';
    const sidebarMenuClass = `${UI_SIDEBAR_MENU_CLASS} ${paddedClass}`;

    return <div className={sidebarMenuClass}>
        {children}
    </div>;
}

SidebarMenu.propTypes = {
    children: propTypeChildren,
    isPadded: PropTypes.bool,
};

SidebarMenu.Title = SidebarMenuTitle;
SidebarMenu.Entry = SidebarMenuEntry;
SidebarMenu.Separator = SidebarMenuSeparator;


function SidebarMenuTitle({ children }) {

    return <div className={UI_SIDEBAR_MENU_TITLE_CLASS}>
        {children}
    </div>;
}

SidebarMenuTitle.propTypes = {
    children: propTypeChildren,
};


function SidebarMenuEntry({ isActive, onClick, children, tag: Tag = 'div', ...rest }) {
    const activeClass = isActive ? `${UI_SIDEBAR_MENU_ENTRY_CLASS}--active` : '';
    const clickableClass = onClick ? `${UI_SIDEBAR_MENU_ENTRY_CLASS}--clickable` : '';
    const entryClass = `${UI_SIDEBAR_MENU_ENTRY_CLASS} ${activeClass} ${clickableClass}`;

    return <Tag className={entryClass} onClick={onClick} {...rest}>
        {children}
    </Tag>;
}

SidebarMenuEntry.propTypes = {
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: propTypeChildren,
};


function SidebarMenuSeparator() {
    return <div className={UI_SIDEBAR_MENU_SEPARATOR_CLASS}></div>;
}
