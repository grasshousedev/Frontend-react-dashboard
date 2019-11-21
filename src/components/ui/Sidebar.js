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

export const SidebarContext = createContext([{}, () => ({})]);

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


export function Sidebar({ children, top, bottom, initialStatus, disableTrigger, height, sidebarContext, className='', ...rest }) {
    const emptyContext = React.createContext([{}, () => ({})]);
    const [contextState, setContextState] = useContext(sidebarContext || emptyContext);
    const [componentState, setComponentState] = useState({ status: initialStatus });

    const [state, setState] = sidebarContext
        ? [contextState, setContextState]
        : [componentState, setComponentState];

    const statusClass = `${UI_SIDEBAR_CONTAINER_CLASS}--${state.status}`;
    const sidebarContainerClass = `${UI_SIDEBAR_CONTAINER_CLASS} ${statusClass} ${className}`;
    const elementsContainerTriggerClass = !disableTrigger ?
        `${UI_SIDEBAR_ELEMENTS_CONTAINER_CLASS}--with-trigger` : '';
    const elementsContainerClass = `${UI_SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`;
    const sidebarTopStatusClass =  `${UI_SIDEBAR_TOP_CLASS}--${state.status}`;
    const sidebarTopClass = `${UI_SIDEBAR_TOP_CLASS} ${sidebarTopStatusClass}`;

    const style = { height };

    return <div className={sidebarContainerClass} style={style} {...rest}>
        <div className={UI_SIDEBAR_CLASS}>
            {!disableTrigger && <div className={UI_SIDEBAR_TRIGGER_CLASS}
                onClick={() => {
                    setState({ ...state, status: state.status === 'open' ? 'closed' : 'open' });
                }}
            >
                {state.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
            </div>
            }
            <div className={elementsContainerClass}>
                <div className={sidebarTopClass}>
                    {top && top(state, setState)}
                    {children}
                </div>
                <div className={UI_SIDEBAR_BOTTOM_CLASS}>
                    {bottom && bottom(state, setState)}
                </div>
            </div>
        </div>
    </div>;
}

Sidebar.propTypes = {
    children: propTypeChildren,
    top: PropTypes.func,
    bottom: PropTypes.func,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
    disableTrigger: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    sidebarContext: PropTypes.object,
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


function SidebarEntry({ sidebarState, iconName, shortcut, link='', id='', children, details, ...rest }) {
    // const sidebarState = useContext(SidebarContext)[0];
    const location = useLocation();

    const Tag = link ? Link : 'div';
    const isActive = isEntryActive(sidebarState, id, link, location);
    const isOpen = sidebarState.status === 'open';

    const activeClass = isActive ? `${UI_SIDEBAR_ENTRY_CLASS}--active` : '';
    const activeOpenClass = isActive && isOpen ? `${UI_SIDEBAR_ENTRY_CLASS}--active-open` : '';
    const entryClass = `${UI_SIDEBAR_ENTRY_CLASS} ${activeClass} ${activeOpenClass}`;
    const entryLabelActiveClass = isActive ? `${UI_SIDEBAR_ENTRY_LABEL_CLASS}--active` : '';
    const entryLabelClass = `${UI_SIDEBAR_ENTRY_LABEL_CLASS} ${entryLabelActiveClass}`;
    const entryDetailsStatusClass = `${UI_SIDEBAR_ENTRY_DETAILS_CLASS}--${sidebarState.status}`;
    const entryDetailsActiveClass = isActive ? `${UI_SIDEBAR_ENTRY_DETAILS_CLASS}--active` : '';
    const entryDetailsClass = `${UI_SIDEBAR_ENTRY_DETAILS_CLASS} ${entryDetailsStatusClass} ${entryDetailsActiveClass}`;

    return <Fragment>
        <Tag className={entryClass} to={link} id={id} {...rest}>
            {iconName && <SidebarIcon name={iconName} isActive={isActive} isOpen={isOpen} />}
            {!iconName && shortcut !== undefined && <SidebarEntryLabelShortcut label={shortcut} />}
            <div className={entryLabelClass}>
                {children}
            </div>
        </Tag>
        {(id || details) && <div className={entryDetailsClass} id={id ? `${id}__details` : undefined}>
            {details && details}
        </div>}
    </Fragment>;
}

SidebarEntry.propTypes = {
    sidebarState: PropTypes.object.isRequired,
    iconName: PropTypes.string,
    shortcut: PropTypes.string,
    link: PropTypes.string,
    id: PropTypes.string,
    children: propTypeChildren,
    details: propTypeChildren,
};

function SidebarEntryLabelShortcut({ label }) {
    const shortcut = label && label.length <= 2 ? label : getShortcut(label);

    return <div className={UI_SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS}>{shortcut}</div>;
}

SidebarEntryLabelShortcut.propTypes = {
    label: PropTypes.string,
};


function getShortcut(label) {
    if (typeof label !== 'string') return label;

    const chars = label.indexOf(' ') >= 0
        ? label.split(' ')[0].substr(0, 1) + label.split(' ')[1].substr(0, 1)
        : label.substr(0, 2);
    return chars.toUpperCase();
}

function isEntryActive(sidebarState, id, link, location) {
    if (sidebarState.activeId)
        return !!(id && sidebarState.activeId === id);

    const locationCheck = location ? location.pathname
        : typeof window !== undefined ? window.location.pathname : '';

    if (link === "/" && (locationCheck === "/" || locationCheck === ""))
        return true;
    else if (link && link !== "/")
        return locationCheck.indexOf(link) === 0;
}