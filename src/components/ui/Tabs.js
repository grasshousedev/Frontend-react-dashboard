import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Exception from 'libs/exceptions/exceptions';

export function TabHeader({ tabs, selectedTab, setSelectedTab }) {
    return <div className="ui-tabs__header-container">
        {tabs.map((tab, index) => {
            const classSelected = index + 1 === selectedTab ? ' ui-tabs__header-label--selected' : '';
            return <div key={`ui-tabs-header-label-${index}`}
                className={`ui-tabs__header-label${classSelected}`}
                onClick={() => setSelectedTab(index + 1)}
            >{tab.label}</div>;
        })}
    </div>;
};

TabHeader.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        })
    ).isRequired,
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
};

export function TabContent({ tabs, selectedTab, compact }) {
    const compactClassName = compact ? 'ui-tabs__content--compact' : '';

    return <div className="ui-tabs__content-container">
        {tabs.map((tab, index) => {
            const selectedClassName = index + 1 === selectedTab ? 'ui-tabs__content--selected' : '';
            const contentClassName = `ui-tabs__content ${selectedClassName} ${compactClassName}`;

            return <div key={`ui-tabs-content-${index}`}
                className={contentClassName}
            >{tab.content}</div>;
        })}
    </div>;
}

TabContent.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
        })
    ).isRequired,
    selectedTab: PropTypes.number.isRequired,
    compact: PropTypes.bool,
};

export function Tabs({ tabs, firstOpen=1, compact=false, ...rest }) {
    if (firstOpen > tabs.length) {
        throw new Exception(`firstOpen (${firstOpen}) should be less or equal to the total number of tabs (${tabs.length})`);
    }

    const [selected, setSelected] = useState(firstOpen);

    return <div className="ui-tabs__container" {...rest}>
        <TabHeader tabs={tabs} selectedTab={selected} setSelectedTab={setSelected} />
        <TabContent tabs={tabs} selectedTab={selected} compact={compact} />
    </div>;
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        })
    ).isRequired,
    firstOpen: PropTypes.number,
    compact: PropTypes.bool,
};
