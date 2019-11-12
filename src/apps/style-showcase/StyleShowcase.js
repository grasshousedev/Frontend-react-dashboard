import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';
import { Sidebar } from 'components/ui/Sidebar';
import { SidebarMenu } from 'components/ui/SidebarMenu';

import { ShowCaseButton } from './components/ShowCaseButton';
import { ShowCaseCard } from './components/ShowCaseCard';
import { ShowCaseDropDown } from './components/ShowCaseDropDown';
import { ShowCaseLoaders } from './components/ShowCaseLoaders';
import { ShowCaseModal } from './components/ShowCaseModal';
import { ShowCaseSidebar } from './components/ShowCaseSidebar';
import { ShowCaseTable } from './components/ShowCaseTable';
import { ShowCaseTabs } from './components/ShowCaseTabs';
import { ShowCaseTiles } from './components/ShowCaseTiles';
import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TimelineComponent } from './TimelineComponent';

import './style-showcase.scss';
import { Panels } from './Panels';

const SECTIONS = {
    BUTTON: { component: ShowCaseButton, label: 'Buttons' },
    CARDS: { component: ShowCaseCard, label: 'Cards' },
    COLORS: { component: Colors, label: 'Colors' },
    DROP_DOWN: { component: ShowCaseDropDown, label: 'Drop Downs' },
    GRID_COMPONENT: { component: GridComponent, label: 'Grids' },
    LOADERS: { component: ShowCaseLoaders, label: 'Loaders' },
    MODAL: { component: ShowCaseModal, label: 'Modals' },
    PANELS: { component: Panels, label: 'Panels' },
    TABS: { component: ShowCaseTabs, label: 'Tabs' },
    TABLE: { component: ShowCaseTable, label: 'Tables' },
    TILES: { component: ShowCaseTiles, label: 'Tiles' },
    TIMELINE: { component: TimelineComponent, label: 'Timeline' },
    TYPOGRAPHY: { component: Typography, label: 'Typography' },
    SIDEBAR: { component: ShowCaseSidebar, label: 'Sidebar' },
};

function getNavigatorSections(setSectionName) {
    const getItem = (section) => {
        return {
            ...SECTIONS[section],
            key: section,
            onClick: () => setSectionName(section),
        };
    };

    return [
        {
            title: 'Typography & Style',
            items: [
                getItem('TYPOGRAPHY'),
                getItem('PANELS'),
                getItem('COLORS'),
            ]
        },
        {
            title: 'Components',
            items: [
                getItem('BUTTON'),
                getItem('DROP_DOWN'),
                getItem('CARDS'),
                getItem('TILES'),
                getItem('LOADERS'),
                getItem('TABS'),
                getItem('MODAL'),
                getItem('SIDEBAR'),
            ]
        },
        {
            title: 'Data Visualization',
            items: [
                getItem('TABLE'),
                getItem('TIMELINE'),
            ]
        },
    ];
}

export function StyleShowcase() {
    const pageBodyRef = useRef(null);
    const [sectionName, setSectionName] = useState('SIDEBAR');
    const sections = getNavigatorSections(setSectionName);


    const SelectedComponent = SECTIONS[sectionName].component;

    return <Fragment>
        <div style={{ display: 'flex' }}>
            <Sidebar
                disableTrigger={true}
                initialStatus={'open'}
                top={() => ShowCaseSidebarNavigator({ sectionName, sections })}
            />
            <div style={{ width: 'calc(100% - 350px)'}}>
                <PageHeader scrollRef={pageBodyRef}>Style Showcase</PageHeader>
                <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
                    <SelectedComponent />
                </PageBody>
            </div>
        </div>
    </Fragment>;
};

function ShowCaseSidebarNavigator({ sectionName, sections }) {
    return <SidebarMenu isPadded={true}>
        {sections.map((section, index) => {
            return <Fragment key={section.title}>
                {index > 0 && <SidebarMenu.Separator />}
                <SidebarMenu.Title>{section.title}</SidebarMenu.Title>
                {section.items.map(item => {
                    return <SidebarMenu.Entry
                        key={item.key}
                        isActive={item.key === sectionName}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </SidebarMenu.Entry>;
                })}
            </Fragment>;
        })}
    </SidebarMenu>;
}

ShowCaseSidebarNavigator.propTypes = {
    sectionName: PropTypes.string,
    sections: PropTypes.array,
};
