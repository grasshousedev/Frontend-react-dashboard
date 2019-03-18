import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from 'components/ui/PageHeader';

import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TabsComponent } from './TabsComponent';
import { TimelineComponent } from './TimelineComponent';

const SECTIONS = {
    COLORS: 'colors',
    TYPOGRAPHY: 'typography',
    GRID_COMPONENT: 'grid-component',
    TABS_COMPONENT: 'tabs-component',
    TIMELINE_COMPONENT: 'timeline-component',
};

export class StyleShowcase extends Component {
    state = {
        sectionName: SECTIONS.TIMELINE_COMPONENT,
    }

    setSection = (sectionName) => {
        this.setState({ sectionName });
    }

    render() {
        const { sectionName } = this.state;

        const controls = <Controls setSection={this.setSection} sectionName={sectionName} />;

        return <div>
            <PageHeader controls={controls}>Style Showcase</PageHeader>
            <div className="dashboard-ui__page-body__container">
                {sectionName === SECTIONS.TYPOGRAPHY && <Typography />}
                {sectionName === SECTIONS.COLORS && <Colors />}
                {sectionName === SECTIONS.GRID_COMPONENT && <GridComponent />}
                {sectionName === SECTIONS.TABS_COMPONENT && <TabsComponent />}
                {sectionName === SECTIONS.TIMELINE_COMPONENT && <TimelineComponent />}
            </div>
        </div>;
    }
};

function Controls({ sectionName, setSection }) {
    const baseClass = 'button button--small';
    return <Fragment>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.COLORS ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.COLORS)}>Colors</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TYPOGRAPHY ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TYPOGRAPHY)}>Typography</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.GRID_COMPONENT ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.GRID_COMPONENT)}>Grid</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TABS_COMPONENT ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TABS_COMPONENT)}>Tabs</button>
        <button
            className={`${baseClass} ${sectionName === SECTIONS.TIMELINE_COMPONENT ? 'button--primary' : ''}`}
            onClick={() => setSection(SECTIONS.TIMELINE_COMPONENT)}>Timeline</button>
    </Fragment>;
}

Controls.propTypes = {
    sectionName: PropTypes.string,
    setSection: PropTypes.func,
};
