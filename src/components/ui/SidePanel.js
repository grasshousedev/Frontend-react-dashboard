import React, { useState, Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';
import { Icon } from './Icon';
import { FullSectionLoader } from './Loader';

const SIDE_PANEL_CLASS = 'ui-side-panel';
const SIDE_PANEL_VISIBLE_CLASS = 'ui-side-panel--visible';
const SIDE_PANEL_CONTAINER_CLASS = `${SIDE_PANEL_CLASS}__container`;
const SIDE_PANEL_HEADER_CLASS = `${SIDE_PANEL_CLASS}__header`;
const SIDE_PANEL_HEADER_TITLE_CLASS = `${SIDE_PANEL_HEADER_CLASS}__title`;
const SIDE_PANEL_HEADER_CONTROLS_CLASS = `${SIDE_PANEL_HEADER_CLASS}__controls`;
const SIDE_PANEL_CONTENT_CLASS  = `${SIDE_PANEL_CLASS}__content`;
const SIDE_PANEL_FOOTER_CLASS  = `${SIDE_PANEL_CLASS}__footer`;

const ICON_CLOSE = 'close';
const ICON_CONTROL_CLASS = `ui-icon__control`;

const SIDE_PANEL_ROOT_ID = 'side-panel-root';

export const DEFAULT_SIDE_PANEL_WIDTH = 500;

let lastSetVisible = null;


export function SidePanel({ Trigger, getSidePanelContentProps }) {
    const [visible, setVisible] = useState(false);
    getSidePanelRoot(); // use here to prepare the panel

    const uniqueSetVisible = state => {
        if (state) {
            if (lastSetVisible) lastSetVisible(false);
            lastSetVisible = null;
        }
        setVisible(state);
    };

    return <Fragment>
        <Trigger setVisible={uniqueSetVisible} visible={visible} />
        {visible && <SidePanelContent {...getSidePanelContentProps({ setVisible })} visible={visible} setVisible={setVisible} />}
    </Fragment>;
}

SidePanel.propTypes = {
    Trigger: propTypeChildren.isRequired,
    getSidePanelContentProps: PropTypes.func.isRequired,
};

function SidePanelContent({
    content,
    title=null,
    controls=null,
    footer=null,
    visible=false,
    hooks={},
    setVisible,
    width=DEFAULT_SIDE_PANEL_WIDTH,
    contentWidth=DEFAULT_SIDE_PANEL_WIDTH,
}) {
    const [sidePanelState, setsidePanelState] = useState({
        isLoading: hooks.onOpen ? true : false,
    });
    const sidePanelRoot = getSidePanelRoot();

    lastSetVisible = setVisible;

    useEffect(() => {
        const openPromise = new Promise((resolve, reject) => {
            if (hooks.onOpen)
                return hooks.onOpen({ resolve, reject });
            else resolve();
        });
        openPromise.then(() => {
            setsidePanelState({ ...sidePanelState, isLoading: false });
        });

        return function cleanup() {
            sidePanelRoot.classList.remove(SIDE_PANEL_VISIBLE_CLASS);
            sidePanelRoot.style.width = 0;
        };
    }, []); // eslint-disable-line

    useEffect(() => {
        if (visible) {
            sidePanelRoot.classList.add(SIDE_PANEL_VISIBLE_CLASS);
            sidePanelRoot.style.width = typeof width === 'number' ? `${width}px` : width;
        }
    }, [visible, sidePanelRoot, width]);

    return createPortal(<div className={SIDE_PANEL_CONTAINER_CLASS} style={{ width: contentWidth }}>
        <div className={SIDE_PANEL_HEADER_CLASS}>
            <div className={SIDE_PANEL_HEADER_TITLE_CLASS}>{title}</div>
            <div className={SIDE_PANEL_HEADER_CONTROLS_CLASS}>
                {controls}
                <Icon name={ICON_CLOSE} size="small" className={ICON_CONTROL_CLASS}
                    onClick={() => setVisible(false)}
                />
            </div>
        </div>
        <div className={SIDE_PANEL_CONTENT_CLASS}>
            {sidePanelState.isLoading && <FullSectionLoader />}
            {!sidePanelState.isLoading && content}
        </div>
        {footer && <div className={SIDE_PANEL_FOOTER_CLASS}>
            {footer}
        </div>}
    </div>, sidePanelRoot);
}

SidePanelContent.propTypes = {
    content: propTypeChildren,
    title: propTypeChildren,
    controls: propTypeChildren,
    footer: propTypeChildren,
    visible: PropTypes.bool,
    hooks: PropTypes.object,
    width: PropTypes.number,
    contentWidth: PropTypes.number,
    setVisible: PropTypes.func.isRequired,
};

function getSidePanelRoot() {
    let sidePanelRoot = document.getElementById(SIDE_PANEL_ROOT_ID);
    if (sidePanelRoot === null) {
        sidePanelRoot = document.createElement('div');
        sidePanelRoot.setAttribute('id', SIDE_PANEL_ROOT_ID);
        sidePanelRoot.classList.add(SIDE_PANEL_CLASS);
        sidePanelRoot.style.width = 0;
        document.body.appendChild(sidePanelRoot);
    }
    return sidePanelRoot;
}