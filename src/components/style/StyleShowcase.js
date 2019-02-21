import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Colors } from './Colors';
import { Headers } from './Headers';
import { PageHeader } from 'components/ui/PageHeader';

const SECTIONS = {
    COLORS: 'colors',
    TYPOGRAPHY: 'typography'
};

export class StyleShowcase extends Component {
    state = {
        sectionName: SECTIONS.COLORS,
    }

    setSection = (sectionName) => {
        this.setState({ sectionName });
    }

    render() {
        const { sectionName } = this.state;

        const controls = <Controls setSection={this.setSection} />;

        return <div>
            <PageHeader controls={controls}>Style Showcase</PageHeader>
            {sectionName === SECTIONS.TYPOGRAPHY &&
                <div>
                    <Headers />
                </div>
            }
            {sectionName === SECTIONS.COLORS &&
                <div>
                    <Colors />
                </div>
            }
        </div>;
    }
};

function Controls({ setSection }) {
    return <Fragment>
        <button className="button button--small" onClick={() => setSection(SECTIONS.COLORS)}>Colors</button>
        <button className="button button--small button--primary" onClick={() => setSection(SECTIONS.TYPOGRAPHY)}>Typography</button>
    </Fragment>;
}

Controls.propTypes = {
    setSection: PropTypes.func,
};
