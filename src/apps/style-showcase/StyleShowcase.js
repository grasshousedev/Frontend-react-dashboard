import React, { Fragment, useState, useRef } from 'react';

import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';

import { ShowCaseButton } from './components/ShowCaseButton';
import { ShowCaseCard } from './components/ShowCaseCard';
import { ShowCaseDropDown } from './components/ShowCaseDropDown';
import { ShowCaseLoaders } from './components/ShowCaseLoaders';
import { ShowCaseModal } from './components/ShowCaseModal';
import { ShowCaseTabs } from './components/ShowCaseTabs';
import { ShowCaseTiles } from './components/ShowCaseTiles';
import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TimelineComponent } from './TimelineComponent';

import './style-showcase.scss';
import { Panels } from './Panels';
import { TableComponent } from './TableComponent';
import { RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Navigator } from 'components/ui/Navigator';

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
    TABLE: { component: TableComponent, label: 'Tables' },
    TILES: { component: ShowCaseTiles, label: 'Tiles' },
    TIMELINE: { component: TimelineComponent, label: 'Timeline' },
    TYPOGRAPHY: { component: Typography, label: 'Typography' },
};

export function StyleShowcase() {
    const pageBodyRef = useRef(null);
    const [sectionName, setSectionName] = useState('MODAL');

    const SelectedComponent = SECTIONS[sectionName].component;

    const getItem = (section) => {
        return {
            ...SECTIONS[section],
            key: section,
            onClick: () => setSectionName(section),
        };
    };

    const sections = [
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

    return <Fragment>
        <PageHeader scrollRef={pageBodyRef}>Style Showcase</PageHeader>
        <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
            <RowBlock>
                <ColumnBlock className="col-sm-12 col-md-9 col-lg-10">
                    <SelectedComponent />
                </ColumnBlock>
                <ColumnBlock className="col-sm-12 col-md-3 col-lg-2 first-sm first-xs last-md">
                    <Navigator
                        selectedKey={sectionName}
                        style={{ marginBottom: 15 }}
                        sections={sections}
                    />
                </ColumnBlock>
            </RowBlock>
        </PageBody>
    </Fragment>;
};
