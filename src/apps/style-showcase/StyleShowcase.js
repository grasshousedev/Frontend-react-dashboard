import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';

import { ButtonComponent } from './ButtonComponent';
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
    BUTTON_COMPONENT: 'button-component',
    COLORS: 'colors',
    CARDS: 'cards',
    DROP_DOWN_COMPONENT: 'drop-down-component',
    GRID_COMPONENT: 'grid-component',
    LOADERS: 'loaders',
    MODAL: 'modal',
    PANELS: 'panels',
    TABS_COMPONENT: 'tabs-component',
    TABLE_COMPONENT: 'table-component',
    TILES: 'tiles',
    TIMELINE_COMPONENT: 'timeline-component',
    TYPOGRAPHY: 'typography',
};

export function StyleShowcase() {
    const pageBodyRef = useRef(null);
    const [sectionName, setSectionName] = useState(SECTIONS.BUTTON_COMPONENT);

    const controls = <Controls setSectionName={setSectionName} sectionName={sectionName} />;

    return <Fragment>
        <PageHeader controls={controls} scrollRef={pageBodyRef}>Style Showcase</PageHeader>
        <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
            {sectionName === SECTIONS.BUTTON_COMPONENT && <ButtonComponent />}
            {sectionName === SECTIONS.CARDS && <CardsComponent />}
            {sectionName === SECTIONS.COLORS && <Colors />}
            {sectionName === SECTIONS.DROP_DOWN_COMPONENT && <DropDownComponent />}
            {sectionName === SECTIONS.GRID_COMPONENT && <GridComponent />}
            {sectionName === SECTIONS.LOADERS && <Loaders />}
            {sectionName === SECTIONS.MODAL && <ModalComponent />}
            {sectionName === SECTIONS.PANELS && <Panels />}
            {sectionName === SECTIONS.TABLE_COMPONENT && <TableComponent />}
            {sectionName === SECTIONS.TABS_COMPONENT && <TabsComponent />}
            {sectionName === SECTIONS.TILES && <Tiles />}
            {sectionName === SECTIONS.TIMELINE_COMPONENT && <TimelineComponent />}
            {sectionName === SECTIONS.TYPOGRAPHY && <Typography />}
        </PageBody>
    </Fragment>;
};

function Controls({ sectionName, setSectionName }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.BUTTON_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.BUTTON_COMPONENT)}>Buttons</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.CARDS ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.CARDS)}>Cards</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.COLORS ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.COLORS)}>Colors</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.DROP_DOWN_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.DROP_DOWN_COMPONENT)}>DropDowns</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TYPOGRAPHY ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.TYPOGRAPHY)}>Typography</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.GRID_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.GRID_COMPONENT)}>Grid</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.PANELS ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.PANELS)}>Panels</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABS_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.TABS_COMPONENT)}>Tabs</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABLE_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.TABLE_COMPONENT)}>Table</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TILES ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.TILES)}>Tiles</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TIMELINE_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.TIMELINE_COMPONENT)}>Timeline</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.LOADERS ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.LOADERS)}>Loaders</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.MODAL ? 'ui-button--primary' : ''}`}
            onClick={() => setSectionName(SECTIONS.MODAL)}>Modals</button>
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSectionName: PropTypes.func,
};
