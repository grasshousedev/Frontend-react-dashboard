import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

const UI_SIDEBAR_MENU_CLASS = `ui-sidebar-menu`;
const UI_SIDEBAR_MENU_TITLE_CLASS = `${UI_SIDEBAR_MENU_CLASS}__title`;
const UI_SIDEBAR_MENU_ENTRY_CLASS = `${UI_SIDEBAR_MENU_CLASS}__entry`;
const UI_SIDEBAR_MENU_SEPARATOR_CLASS = `${UI_SIDEBAR_MENU_CLASS}__separator`;


export function SidebarMenu({ children }) {

    return <div className={UI_SIDEBAR_MENU_CLASS}>
        {children}
    </div>;
}

SidebarMenu.propTypes = {
    children: propTypeChildren,
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


function SidebarMenuEntry({ isActive, onClick, children }) {
    const activeClass = isActive ? `${UI_SIDEBAR_MENU_ENTRY_CLASS}--active` : '';
    const clickableClass = onClick ? `${UI_SIDEBAR_MENU_ENTRY_CLASS}--clickable` : '';
    const entryClass = `${UI_SIDEBAR_MENU_ENTRY_CLASS} ${activeClass} ${clickableClass}`;

    return <div className={entryClass} onClick={onClick}>
        {children}
    </div>;
}

SidebarMenuEntry.propTypes = {
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    children: propTypeChildren,
};


function SidebarMenuSeparator() {
    return <div className={UI_SIDEBAR_MENU_SEPARATOR_CLASS}></div>;
}
