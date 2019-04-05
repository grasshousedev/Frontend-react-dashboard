import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from 'components/ui/PageHeader';

import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TabsComponent } from './TabsComponent';
import { TimelineComponent } from './TimelineComponent';
import { Loaders } from './Loaders';
import { Tiles } from './Tiles';
import { CardsComponent } from './CardsComponent';
import { ModalComponent } from './ModalComponent';

const SECTIONS = {
    COLORS: 'colors',
    CARDS: 'cards',
    GRID_COMPONENT: 'grid-component',
    LOADERS: 'loaders',
    MODAL: 'modal',
    TABS_COMPONENT: 'tabs-component',
    TILES: 'tiles',
    TIMELINE_COMPONENT: 'timeline-component',
    TYPOGRAPHY: 'typography',
};

export class StyleShowcase extends Component {
    state = {
        sectionName: SECTIONS.MODAL,
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
                {sectionName === SECTIONS.CARDS && <CardsComponent />}
                {sectionName === SECTIONS.COLORS && <Colors />}
                {sectionName === SECTIONS.GRID_COMPONENT && <GridComponent />}
                {sectionName === SECTIONS.LOADERS && <Loaders />}
                {sectionName === SECTIONS.MODAL && <ModalComponent />}
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
            className={`${baseClass} ${sectionName === SECTIONS.CARDS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.CARDS)}>Cards</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.COLORS ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.COLORS)}>Colors</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TYPOGRAPHY ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TYPOGRAPHY)}>Typography</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.GRID_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.GRID_COMPONENT)}>Grid</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABS_COMPONENT ? 'ui-button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TABS_COMPONENT)}>Tabs</button>
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
            onClick={() => setSection(SECTIONS.MODAL)}>Loaders</button>
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSection: PropTypes.func,
};
