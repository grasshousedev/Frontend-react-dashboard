import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';

import { ButtonComponent } from './components/Button';
import { Colors } from './Colors';
import { DropDownComponent } from './DropDownComponent';
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

const SECTIONS = {
    BUTTON_COMPONENT: { component: ButtonComponent, label: 'Buttons' },
    CARDS: { component: CardsComponent, label: 'Cards' },
    COLORS: { component: Colors, label: 'Colors' },
    DROP_DOWN_COMPONENT: { component: DropDownComponent, label: 'Drop Downs' },
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
    const [sectionName, setSectionName] = useState('BUTTON_COMPONENT');

    const controls = <Controls setSectionName={setSectionName} sectionName={sectionName} />;
    const SelectedComponent = SECTIONS[sectionName].component;

    return <Fragment>
        <PageHeader controls={controls} scrollRef={pageBodyRef}>Style Showcase</PageHeader>
        <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
            <SelectedComponent />
        </PageBody>
    </Fragment>;
};

function Controls({ sectionName, setSectionName }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        {Object.keys(SECTIONS).map(section => {
        return <button key={section}
            className={`${baseClass} ${sectionName === section ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(section)}>{SECTIONS[section].label}</button>;
    })}
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSectionName: PropTypes.func,
};
