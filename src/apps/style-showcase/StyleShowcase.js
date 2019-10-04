import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from 'components/ui/PageHeader';

import { Buttons } from './Buttons';
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
    BUTTONS: 'buttons',
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

export class StyleShowcase extends Component {
    state = {
        sectionName: SECTIONS.DROP_DOWN_COMPONENT,
    }

    setSection = (sectionName) => {
        this.setState({ sectionName });
    }

    render() {
        const { sectionName } = this.state;

        const controls = <Controls setSection={this.setSection} sectionName={sectionName} />;

        return <div>
            <PageHeader controls={controls}>Style Showcase</PageHeader>
            <div className="ui-page-body">
                {sectionName === SECTIONS.BUTTONS && <Buttons />}
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
            </div>
        </div>;
    }
};

function Controls({ sectionName, setSection }) {
    const baseClass = 'ui-button ui-button--small';
    return <Fragment>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.BUTTONS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.BUTTONS)}>Buttons</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.CARDS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.CARDS)}>Cards</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.COLORS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.COLORS)}>Colors</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.DROP_DOWN_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.DROP_DOWN_COMPONENT)}>DropDowns</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TYPOGRAPHY ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TYPOGRAPHY)}>Typography</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.GRID_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.GRID_COMPONENT)}>Grid</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.PANELS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.PANELS)}>Panels</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABS_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TABS_COMPONENT)}>Tabs</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABLE_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TABLE_COMPONENT)}>Table</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TILES ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TILES)}>Tiles</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TIMELINE_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TIMELINE_COMPONENT)}>Timeline</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.LOADERS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.LOADERS)}>Loaders</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.MODAL ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.MODAL)}>Modals</button>
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSection: PropTypes.func,
};
