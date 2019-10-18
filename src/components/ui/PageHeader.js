import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

    const containerClass = `ui-page-header__container ${showShadow ? 'ui-page-header__container--with-shadow' : ''}`;
    return <div className={containerClass}>
        <div className="ui-page-header__header-container">
            <h2 className="ui-page-header">{children}</h2>
        </div>
        <div className="ui-page-header__controls-container">
            {controls && controls}
        </div>
    </div>;
}

PageHeader.propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.node,
    scrollRef: PropTypes.object,
};
