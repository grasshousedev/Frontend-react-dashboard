import React, { Fragment, useState, useRef } from 'react';

import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';

import { ShowCaseButton } from './components/ShowCaseButton';
import { ShowCaseDropDown } from './components/ShowCaseDropDown';
import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TabsComponent } from './TabsComponent';
import { TimelineComponent } from './TimelineComponent';
import { Loaders } from './Loaders';
import { Tiles } from './Tiles';
import { CardsComponent } from './CardsComponent';
import { ModalComponent } from './ModalComponent';

import './style-showcase.scss';
import { Panels } from './Panels';
import { TableComponent } from './TableComponent';
import { RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Navigator } from 'components/ui/Navigator';

const SECTIONS = {
    BUTTON_COMPONENT: { component: ShowCaseButton, label: 'Buttons' },
    CARDS: { component: CardsComponent, label: 'Cards' },
    COLORS: { component: Colors, label: 'Colors' },
    DROP_DOWN_COMPONENT: { component: ShowCaseDropDown, label: 'Drop Downs' },
    GRID_COMPONENT: { component: GridComponent, label: 'Grids' },
    LOADERS: { component: Loaders, label: 'Loaders' },
    MODAL: { component: ModalComponent, label: 'Modals' },
    PANELS: { component: Panels, label: 'Panels' },
    TABS_COMPONENT: { component: TabsComponent, label: 'Tabs' },
    TABLE_COMPONENT: { component: TableComponent, label: 'Tables' },
    TILES: { component: Tiles, label: 'Tiles' },
    TIMELINE_COMPONENT: { component: TimelineComponent, label: 'Timeline' },
    TYPOGRAPHY: { component: Typography, label: 'Typography' },
};

export function StyleShowcase() {
    const pageBodyRef = useRef(null);
    const [sectionName, setSectionName] = useState('DROP_DOWN_COMPONENT');

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
                getItem('BUTTON_COMPONENT'),
                getItem('DROP_DOWN_COMPONENT'),
                getItem('CARDS'),
                getItem('TILES'),
                getItem('LOADERS'),
                getItem('TABS_COMPONENT'),
                getItem('MODAL'),
            ]
        },
        {
            title: 'Data Visualization',
            items: [
                getItem('TABLE_COMPONENT'),
                getItem('TIMELINE_COMPONENT'),
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
