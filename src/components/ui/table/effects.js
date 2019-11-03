import { useEffect, useState, useRef } from 'react';
import { SCROLLBAR_SIZE } from './constants';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export function useScrollSync(master, elementsToSync, scrollMaster, sync, onChange) {
    useEffect(() => {
        if (master.current && master === scrollMaster) {
            const masterEl = master.current;
            const syncMaster = (e) => {
                elementsToSync.forEach(ref => {
                    if (!ref.current) return;
                    if (masterEl !== e.target || masterEl === ref.current) return;

                    if (sync.scrollLeft) {
                        if (ref.current.scrollLeft === masterEl.scrollLeft) return;
                        ref.current.scrollLeft = masterEl.scrollLeft;
                        onChange && onChange(masterEl.scrollLeft, 'scrollLeft');
                    }

                    if (sync.scrollTop) {
                        if (ref.current.scrollTop === masterEl.scrollTop) return;
                        ref.current.scrollTop = masterEl.scrollTop;
                        onChange && onChange(masterEl.scrollTop, 'scrollTop');
                    }
                });
            };

            masterEl.addEventListener('scroll', syncMaster);
            return () => {
                masterEl.removeEventListener('scroll', syncMaster);
            };
        }
    }, [master, elementsToSync, scrollMaster, sync, onChange]);
}


export function useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState, tableStyleState, windowWidth) {
    const prevTableStyleState = usePrevious(tableStyleState);

    useEffect(() => {
        const stateChanged = JSON.stringify(tableStyleState) !== JSON.stringify(prevTableStyleState);
        if (tableHeaderContainerRef.current && tableBodyContainerRef.current && stateChanged) {
            const headerEl = tableHeaderContainerRef.current;
            const bodyEl = tableBodyContainerRef.current;
            const bodyHasVericalScrollBar = bodyEl.offsetHeight !== bodyEl.scrollHeight;
            const bodyHasHorizontalScrollBar = (bodyEl.offsetWidth - (bodyEl.scrollWidth + bodyHasVericalScrollBar * 15)) !== 0;
            const newTableStyleState = { bodyHasVericalScrollBar, bodyHasHorizontalScrollBar };

            if (columns.some(col => !col.width)) {
                const columnsWidth = columns.reduce((tot, col) => tot += col.width || 0, 0);
                const expandableColumnWidth = headerEl.clientWidth
                    - columnsWidth
                    - (SCROLLBAR_SIZE * bodyHasVericalScrollBar)
                ;
                newTableStyleState.expandableColumnWidth = Math.max(expandableColumnWidth, 100);
                newTableStyleState.bodyHasHorizontalScrollBar = false;
            }
            newTableStyleState.totalWidth = columns.reduce((tot, col) => {
                return tot + (col.width ? col.width : newTableStyleState.expandableColumnWidth);
            }, 0);

            setTableStyleState({ ...tableStyleState, ...newTableStyleState });
        }
    }, [columns, config, windowWidth, tableStyleState]); // eslint-disable-line
};

export function useHover(ref) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            const hoverIn = () => setIsHovered(true);
            const hoverOut = () => setIsHovered(false);

            node.addEventListener('mouseover', hoverIn);
            node.addEventListener('mouseout', hoverOut);

            return () => {
                node.removeEventListener('mouseover', hoverIn);
                node.removeEventListener('mouseout', hoverOut);
            };
        }
    }, [ref.current]); // eslint-disable-line

    return isHovered;
}

export function useWindowSize() {
    const isClient = typeof window === 'object';

    function getWindowSize() {
        if (!isClient) return { width: undefined, height: undefined };

        return { width: window.innerWidth, height: window.innerHeight };
    };
    const [size, setSize] = useState(getWindowSize());

    useEffect(() => {
        if (!isClient) return;

        const updateSize = () => setSize(getWindowSize);
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []); // eslint-disable-line

    return size;
}
