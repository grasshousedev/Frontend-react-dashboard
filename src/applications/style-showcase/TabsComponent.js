import React, { Fragment, useState } from 'react';
import { Tabs } from 'components/ui/Tabs';
import { Lorem } from 'components/ui/Lorem';

function TabContent1() {
    const [counter, setCounter] = useState(0);

    return <Fragment>
        <div className="ui-section">
            <div className="ui-section__column w-50pc">
                <h4>Counter sample</h4>
                <div>Counter value: {counter}</div>
                <div>
                    <button className="button button--small"
                        onClick={() => setCounter(counter + 1)}
                    >Increment</button>
                </div>
            </div>
            <div className="ui-section__column w-50pc">
                <Lorem />
            </div>
        </div>
        <div className="ui-section">
            <div className="ui-section__column">
                <Lorem />
            </div>
        </div>
    </Fragment>;
}

const tabsSample = [
    { label: 'Tab 1', content: <TabContent1 /> },
    { label: 'Tab 2', content: <Lorem paragraphs={3} /> },
    { label: 'Tab 3', content: <Lorem paragraphs={3} /> },
    { label: 'Tab 4', content: <Lorem /> },
];

export function TabsComponent () {    
    return <Fragment>
        <h2>Tabs</h2>
        <Tabs tabs={tabsSample} />
    </Fragment>;
}