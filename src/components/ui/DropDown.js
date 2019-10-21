import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DROPDOWN_CLASS = 'ui-dropdown';
const OUTER_CONTAINER_CLASS = `${DROPDOWN_CLASS}__outer-container`;
const CONTAINER_CLASS = `${DROPDOWN_CLASS}__container`;
const TRIGGER_CLASS = `${DROPDOWN_CLASS}__trigger`;
const ENTRY_CLASS = `${DROPDOWN_CLASS}__entry`;
const DIVIDER_CLASS = `${DROPDOWN_CLASS}__divider`;

export const DROPDOWN_POSITIONS = {
    AUTO: 'auto',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
};


export function DropDown({ children, trigger, triggerOn='click', position='auto', persist=false }) {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    const initialState = { visible: false, top: 0, left: undefined, controllerWidth: 0, triggerRef, persist };
    const [state, setState] = useState(initialState);

    useAmendedPosition(state, setState, containerRef, position);

    const containerClass = `${CONTAINER_CLASS} ${state.visible ? `${CONTAINER_CLASS}--visible` : ''}`;
    const containerStyle = { top: state.top + 'px', left: state.left + 'px' };

    const triggerProps = {};
    if (triggerOn === 'click')
        triggerProps.onClick = e => toggleMenuVisibility(e, state, setState);
    if (triggerOn === 'hover') {
        triggerProps.onMouseEnter = e => toggleMenuVisibility(e, state, setState);
        if (!persist) {
            triggerProps.onMouseLeave = e => setState(st => ({ ...st, visible: false }));
        } else {
            triggerProps.onClick = e => toggleMenuVisibility(e, state, setState);
        }
    }

    return <div className={OUTER_CONTAINER_CLASS}>
        <div className={TRIGGER_CLASS} {...triggerProps} ref={triggerRef}>
            {trigger}
            <div ref={containerRef} className={containerClass} style={containerStyle}>
                {children}
            </div>
        </div>
    </div>;
}

DropDown.propTypes = {
    trigger: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    triggerOn: PropTypes.oneOf(['click', 'hover']),
    position: PropTypes.oneOf([
        DROPDOWN_POSITIONS.AUTO,
        DROPDOWN_POSITIONS.TOP_LEFT, DROPDOWN_POSITIONS.TOP_RIGHT,
        DROPDOWN_POSITIONS.BOTTOM_LEFT, DROPDOWN_POSITIONS.BOTTOM_RIGHT,
    ]),
    persist: PropTypes.bool,
};


function DropDownEntry({ children, onClick, disabled=false }) {
    const dropDownEntryClass = `${ENTRY_CLASS} ${onClick !== undefined && !disabled ? `${ENTRY_CLASS}--clickable` : '' }`;

    return <div className={dropDownEntryClass} onClick={onClick}>{children}</div>;
}

DropDownEntry.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};


function DropDownDivider() {
    return <div className={DIVIDER_CLASS} />;
}


DropDown.Entry = DropDownEntry;
DropDown.Divider = DropDownDivider;


function useAmendedPosition(state, setState, containerRef, position) {
    useEffect(() => {
        const node = containerRef.current;
        if (node && state.visible) {
            const leftBound = window.innerWidth;
            const dropDownRect = node.getBoundingClientRect();
            const lastCoord = state.left + dropDownRect.width;

            const amendedState = {};

            const mustBePlacedLeft = (lastCoord > leftBound && position === DROPDOWN_POSITIONS.AUTO) ||
                [DROPDOWN_POSITIONS.TOP_LEFT, DROPDOWN_POSITIONS.BOTTOM_LEFT].includes(position);
            if (mustBePlacedLeft) {
                const leftPos = state.targetLeft - dropDownRect.width + state.controllerWidth;
                if (state.left !== leftPos) amendedState.left = leftPos;
            }

            const mustBePlacedTop = [DROPDOWN_POSITIONS.TOP_LEFT, DROPDOWN_POSITIONS.TOP_RIGHT].includes(position);
            if (mustBePlacedTop) {
                const topPos = state.targetTop - dropDownRect.height;
                if (state.top !== topPos) amendedState.top = topPos;
            }

            if (Object.keys(amendedState).length > 0) {
                setState({ ...state, ...amendedState });
            }

            const closeMenu = e => {
                if (!state.persist || e.target === state.triggerRef)
                setState({ ...state, visible: false });
            };
            document.addEventListener('click', closeMenu);

            return () => {
                document.removeEventListener('click', closeMenu);
            };
        }
    }, [state, setState, containerRef, position]);
}

function toggleMenuVisibility(e, state, setState) {
    if (state.visible) {
        setState({ ...state, visible: false });
    } else {
        const targetRect = e.target.getBoundingClientRect();

        const newState = {
            visible: true,
            top: targetRect.top + targetRect.height,
            left: targetRect.left,
            targetTop: targetRect.top,
            targetLeft: targetRect.left,
            controllerWidth: targetRect.width,
            controllerHeight: targetRect.height,
        };
        setState(newState);
    }
};
