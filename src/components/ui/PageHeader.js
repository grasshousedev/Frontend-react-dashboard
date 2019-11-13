import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PAGE_CLASS } from './Page';


const PAGE_HEADER_CLASS = `${PAGE_CLASS}__header`;
const PAGE_HEADER_CONTAINER_CLASS = `${PAGE_HEADER_CLASS}__container`;
const PAGE_HEADER_HEADER_CONTAINER_CLASS = `${PAGE_HEADER_CLASS}__header-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_CLASS = `${PAGE_HEADER_CLASS}__controls-container`;


export function PageHeader({ children, controls, scrollRef }) {
    const [showShadow, setShowShadow] = useState(false);

    useEffect(() => {
        if (scrollRef) {
            const node = scrollRef.current;
            const scrollHandler = () => { setShowShadow(node.scrollTop !== 0); };
            node.addEventListener('scroll', scrollHandler);

            return () => { node.removeEventListener('scroll', scrollHandler); };
        }
    }, [scrollRef]);

    const shadowClass = showShadow ? `${PAGE_HEADER_CONTAINER_CLASS}--with-shadow` : '';
    const containerClass = `${PAGE_HEADER_CONTAINER_CLASS} ${shadowClass}`;

    return <div className={containerClass}>
        <div className={PAGE_HEADER_HEADER_CONTAINER_CLASS}>
            <h2 className={PAGE_HEADER_CLASS}>{children}</h2>
        </div>
        <div className={PAGE_HEADER_CONTROLS_CONTAINER_CLASS}>
            {controls && controls}
        </div>
    </div>;
}

PageHeader.propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.node,
    scrollRef: PropTypes.object,
};
