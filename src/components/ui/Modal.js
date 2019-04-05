import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { FullSectionLoader } from './Loader';


export function ModalWindow({ title, content, footer, maximized, closeModal, setViewModalWindow, wrapperClass, startWidth, startHeight, hooks, canMaximize }) {
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

    // componentDidMount
    useEffect(() => {      
        const modalRoot = document.getElementById('modal-root');         
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
    }, []);
  
    const uiModalContainerClasses = modalState.isMaximized
        ? 'ui-modal__container--maximized'
        : 'ui-modal__container--default';

    return createPortal(<Fragment>
        <div className={`ui-modal__wrapper ${wrapperClass}`}>
            <div className={`ui-modal__container ${uiModalContainerClasses}`} style={modalState.modalContainerStyle}>
                <div className="ui-modal__header">
                    <div className="ui-modal__title">
                        {title}
                    </div>
                    <div className="ui-modal__controls">
                        {!modalState.isLoading && <Fragment>
                            {!modalState.isMaximized && canMaximize &&
                                <i className="fas fa-window-maximize ui-modal__control" onClick={() => setIsMaximized(true)} />}
                            {modalState.isMaximized && canMaximize &&
                                <i className="fas fa-window-minimize ui-modal__control" onClick={() => setIsMaximized(false)} />}
                            <i className="fas fa-times ui-modal__control" onClick={() => closeModalWindow({ source: 'closeIcon' })} />
                        </Fragment>}
                    </div>
                </div>
                <div className="ui-modal__content ui-modal__content--header-footer">
                    {modalState.isLoading && <FullSectionLoader />}
                    {!modalState.isLoading && content}
                </div>
                <div className="ui-modal__footer">
                    {!modalState.isLoading && footer}
                </div>
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