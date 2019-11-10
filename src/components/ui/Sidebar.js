import React, { Fragment, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

import { propTypeChildren } from 'components/utils';
import { Icon } from './Icon';


const UI_SIDEBAR_CLASS = 'ui-sidebar';
const UI_SIDEBAR_CONTAINER_CLASS = `${UI_SIDEBAR_CLASS}__container`;
const UI_SIDEBAR_TRIGGER_CLASS = `${UI_SIDEBAR_CLASS}__trigger`;
const UI_SIDEBAR_ELEMENTS_CONTAINER_CLASS = `${UI_SIDEBAR_CLASS}__elements-container`;
const UI_SIDEBAR_TOP_CLASS = `${UI_SIDEBAR_CLASS}__top-container`;
const UI_SIDEBAR_BOTTOM_CLASS = `${UI_SIDEBAR_CLASS}__bottom-container`;
const UI_SIDEBAR_ICON_CLASS = `${UI_SIDEBAR_CLASS}__icon`;
const UI_SIDEBAR_ENTRY_CLASS = `${UI_SIDEBAR_CLASS}__entry`;
const UI_SIDEBAR_ENTRY_LABEL_CLASS = `${UI_SIDEBAR_ENTRY_CLASS}__label`;
const UI_SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS = `${UI_SIDEBAR_ENTRY_LABEL_CLASS}__shortcut`;
const UI_SIDEBAR_ENTRY_DETAILS_CLASS = `${UI_SIDEBAR_ENTRY_CLASS}__details`;

export const SidebarContext = createContext([{}, () => {}]);

export const SidebarProvider = ({ children, initialStatus }) => {
    const [state, setState] = useState({ status: initialStatus });

    return <SidebarContext.Provider value={[state, setState]}>
        {children}
    </SidebarContext.Provider>;
};

SidebarProvider.propTypes = {
    children: propTypeChildren,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
};

SidebarProvider.defaultProps = {
    initialStatus: 'closed',
};


export function Sidebar({ children, bottom, disableTrigger, ...rest }) {
    const [state, setState] = useContext(SidebarContext);

    const statusClass = `${UI_SIDEBAR_CONTAINER_CLASS}--${state.status}`;
    const sidebarContainerClass = `${UI_SIDEBAR_CONTAINER_CLASS} ${statusClass}`;
    const elementsContainerTriggerClass = !disableTrigger ?
        `${UI_SIDEBAR_ELEMENTS_CONTAINER_CLASS}--with-trigger` : '';
    const elementsContainerClass = `${UI_SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`;
    const sidebarTopStatusClass =  `${UI_SIDEBAR_TOP_CLASS}--${state.status}`;
    const sidebarTopClass = `${UI_SIDEBAR_TOP_CLASS} ${sidebarTopStatusClass}`;

    return <div className={sidebarContainerClass}>
        <div className={UI_SIDEBAR_CLASS}>
            {!disableTrigger && <div className={UI_SIDEBAR_TRIGGER_CLASS}
                onClick={() => {
                    console.log('Clicked 2:', state.status);
                    setState({ ...state, status: state.status === 'open' ? 'closed' : 'open' });
                }}
            >
                {state.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
            </div>
            }
            <div className={elementsContainerClass}>
                <div className={sidebarTopClass}>
                    {children}
                </div>
                {bottom && <div className={UI_SIDEBAR_BOTTOM_CLASS}>{bottom}</div>}
            </div>
        </div>
    </div>;
}

Sidebar.propTypes = {
    children: propTypeChildren,
    bottom: propTypeChildren,
    disableTrigger: PropTypes.bool,
};

Sidebar.defaultProps = {
    initialStatus: 'closed',
    disableTrigger: false,
};

Sidebar.Icon = SidebarIcon;
Sidebar.Entry = SidebarEntry;
Sidebar.Provider = SidebarProvider;


function SidebarIcon({name, isActive, isOpen, ...rest}) {
    const iconActiveOpenClass = isActive && isOpen ? `${UI_SIDEBAR_ICON_CLASS}__icon--active-open` : '';

    return <div className={UI_SIDEBAR_ICON_CLASS} {...rest}>
        <Icon name={name} className={iconActiveOpenClass} />
    </div>;
}

SidebarIcon.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
};


function SidebarEntry({ iconName, shortcut='', link='', id='', children, details, ...rest }) {
    const sidebarStatus = useContext(SidebarContext)[0];
    const location = useLocation();

    const Tag = link ? Link : 'div';
    const isActive = link && isEntryActive(link, location);
    const isOpen = sidebarStatus.status === 'open';

    const activeClass = isActive ? `${UI_SIDEBAR_ENTRY_CLASS}--active` : '';
    const activeOpenClass = isActive && isOpen ? `${UI_SIDEBAR_ENTRY_CLASS}--active-open` : '';
    const entryClass = `${UI_SIDEBAR_ENTRY_CLASS} ${activeClass} ${activeOpenClass}`;
    const entryLabelActiveClass = isActive ? `${UI_SIDEBAR_ENTRY_LABEL_CLASS}--active` : '';
    const entryLabelClass = `${UI_SIDEBAR_ENTRY_LABEL_CLASS} ${entryLabelActiveClass}`;
    const entryDetailsStatusClass = `${UI_SIDEBAR_ENTRY_DETAILS_CLASS}--${sidebarStatus.status}`;
    const entryDetailsActiveClass = isActive ? `${UI_SIDEBAR_ENTRY_DETAILS_CLASS}--active` : '';
    const entryDetailsClass = `${UI_SIDEBAR_ENTRY_DETAILS_CLASS} ${entryDetailsStatusClass} ${entryDetailsActiveClass}`;

    return <Fragment>
        <Tag className={entryClass} to={link} {...rest}>
            {iconName && <SidebarIcon name={iconName} isActive={isActive} isOpen={isOpen} />}
            {!iconName && shortcut && <SidebarEntryLabelShortcut label={shortcut} />}
            <div className={entryLabelClass}>
                {children}
            </div>
        </Tag>
        {id && <div className={entryDetailsClass} id={`${id}__details`}>
            {details && details}
        </div>}
    </Fragment>;
}

SidebarEntry.propTypes = {
    iconName: PropTypes.string,
    shortcut: PropTypes.string,
    link: PropTypes.string,
    id: PropTypes.string,
    children: propTypeChildren,
    details: propTypeChildren,
};

function SidebarEntryLabelShortcut({ label }) {
    const shortcut = label.length <= 2 ? label : getShortcut(label);

    return <div className={UI_SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS}>{shortcut}</div>;
}

SidebarEntryLabelShortcut.propTypes = {
    label: PropTypes.string.isRequired,
};


function getShortcut(label) {
    const chars = label.indexOf(' ') >= 0
        ? label.split(' ')[0].substr(0, 1) + label.split(' ')[1].substr(0, 1)
        : label.substr(0, 2);
    return chars.toUpperCase();
}

function isEntryActive(link, location) {
    const locationCheck = location ? location.pathname
        : typeof window !== undefined ? window.location.pathname : '';

    if ((link === "/" && locationCheck === "/") || locationCheck === "")
        return true;
    else if (link !== "/")
        return locationCheck.indexOf(link) === 0;
}