import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Icon } from './Icon';
import { FullSectionLoader } from './Loader';

const MODAL_CLASS = 'ui-modal';
const MODAL_CONTAINER_CLASS = `${MODAL_CLASS}__container`;
const MODAL_CONTAINER_MAXIMIZED_CLASS = `${MODAL_CONTAINER_CLASS}--maximized`;
const MODAL_CONTAINER_DEFAULT_CLASS = `${MODAL_CONTAINER_CLASS}--default`;
const MODAL_HEADER_CLASS = `${MODAL_CLASS}__header`;
const MODAL_CONTROLS_CLASS = `${MODAL_CLASS}__controls`;
const MODAL_CONTENT_CLASS = `${MODAL_CLASS}__content`;
const MODAL_CONTENT_HEADER_CLASS = `${MODAL_CONTENT_CLASS}--header`;
const MODAL_CONTENT_HEADER_FOOTER_CLASS = `${MODAL_CONTENT_CLASS}--header--footer`;
const MODAL_TITLE_CLASS = `${MODAL_CLASS}__title`;
const MODAL_FOOTER_CLASS = `${MODAL_CLASS}__footer`;

const ICON_MAXIMIZE = 'fullscreen';
const ICON_MINIMIZE = 'fullscreen_exit';
const ICON_CLOSE = 'close';
const ICON_CONTROL_CLASS = `ui-icon__control`;

const MODAL_ROOT_ID = 'modal-root';

// these should match the CSS ones
const HEADER_HEIGHT = 55;
const FOOTER_HEIGHT = 65;

export function ModalWindow({
        title,
        content,
        footer,
        maximized,
        closeModal,
        setViewModalWindow,
        wrapperClass,
        startWidth,
        startHeight,
        hooks,
        canMaximize
}) {
    const sizedModalContainerStyle = {};
    if (!maximized) {
        sizedModalContainerStyle.width = startWidth;
        sizedModalContainerStyle.height = startHeight;
    }

    const [modalContainer] = useState(document.createElement('div'));
    const [modalState, setModalState] = useState({
        isMaximized: maximized,
        modalContainerStyle: maximized ? {} : sizedModalContainerStyle,
        isLoading: hooks.onOpen ? true : false,
    });

    const setIsMaximized = (isMax) => {
        setModalState({
            ...modalState,
            isMaximized: isMax,
            modalContainerStyle: isMax ? {} : sizedModalContainerStyle,
        });
    };

    const closeModalWindow = closeModal ? closeModal : () => setViewModalWindow(false);

    useEffect(() => {
        let modalRoot = document.getElementById(MODAL_ROOT_ID);
        if (modalRoot === null) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', MODAL_ROOT_ID);
            document.body.appendChild(modalRoot);
        }
        modalRoot.appendChild(modalContainer);

        const openPromise = new Promise((resolve, reject) => {
            if (hooks.onOpen)
                return hooks.onOpen({ resolve, reject });
            else resolve();
        });
        openPromise.then(() => {
            setModalState({ ...modalState, isLoading: false });
        });

        return function cleanup() {
            modalRoot.removeChild(modalContainer);
        };
    }, []); // eslint-disable-line

    const uiModalContainerStatusClass = modalState.isMaximized
        ? MODAL_CONTAINER_MAXIMIZED_CLASS
        : MODAL_CONTAINER_DEFAULT_CLASS;

    const uiModalContentSizeClass = footer
        ? MODAL_CONTENT_HEADER_FOOTER_CLASS : MODAL_CONTENT_HEADER_CLASS;
    const uiModalContentStyle = {};
    if (startHeight && !modalState.isMaximized) {
        // TODO: refactor startHeight to be a number as well
        uiModalContentStyle.height = `${+startHeight.replace('px', '') - HEADER_HEIGHT - FOOTER_HEIGHT}px`;
    }

    return createPortal(<Fragment>
        <div className={`ui-modal__wrapper ${wrapperClass}`}>
            <div className={`${MODAL_CONTAINER_CLASS} ${uiModalContainerStatusClass}`} style={modalState.modalContainerStyle}>
                <div className={MODAL_HEADER_CLASS}>
                    <div className={MODAL_TITLE_CLASS}>
                        {title}
                    </div>
                    <div className={MODAL_CONTROLS_CLASS}>
                        {!modalState.isLoading && <Fragment>
                            {!modalState.isMaximized && canMaximize &&
                                <Icon name={ICON_MAXIMIZE} className={ICON_CONTROL_CLASS} onClick={() => setIsMaximized(true)} size="small" />}
                            {modalState.isMaximized && canMaximize &&
                                <Icon name={ICON_MINIMIZE} className={ICON_CONTROL_CLASS} onClick={() => setIsMaximized(false)} size="small" />}
                            <Icon name={ICON_CLOSE} className={ICON_CONTROL_CLASS} onClick={() => closeModalWindow({ source: 'closeIcon' })} size="small" />
                        </Fragment>}
                    </div>
                </div>
                <div
                    className={`${MODAL_CONTENT_CLASS} ${uiModalContentSizeClass}`}
                    style={uiModalContentStyle}
                >
                    {modalState.isLoading && <FullSectionLoader />}
                    {!modalState.isLoading && content}
                </div>
                {footer && <div className={MODAL_FOOTER_CLASS}>
                    {!modalState.isLoading && footer}
                </div>}
            </div>
        </div>
    </Fragment>, modalContainer);
}

ModalWindow.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    closeModal: PropTypes.func,
    maximized: PropTypes.bool,
    canMaximize: PropTypes.bool,
    wrapperClass: PropTypes.string,
    startHeight: PropTypes.string,
    startWidth: PropTypes.string,
    hooks: PropTypes.shape({
        onOpen: PropTypes.func,
    })
};

ModalWindow.defaultProps = {
    maximized: false,
    canMaximize: true,
    wrapperClass: '',
    startHeight: '400px',
    startWidth: '70%',
    hooks: {},
};

export function ModalTrigger({ Trigger, getModalWindowProps }) {
    const [viewModalWindow, setViewModalWindow] = useState(false);

    return <Fragment>
        <Trigger setViewModalWindow={setViewModalWindow} />
        {viewModalWindow && <ModalWindow {...getModalWindowProps({ setViewModalWindow })} setViewModalWindow={setViewModalWindow} />}
    </Fragment>;
}

ModalTrigger.propTypes = {
    Trigger: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    getModalWindowProps: PropTypes.func.isRequired,
};
