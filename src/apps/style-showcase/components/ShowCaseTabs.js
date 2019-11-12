import React, { Fragment, useState } from 'react';
import { Tabs } from 'components/ui/Tabs';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { Section } from 'components/ui/Section';
import { Block, RowBlock } from 'components/ui/Blocks';
import { Monospace } from 'components/ui/Text';
import { Button } from 'components/ui/Button';
import { PropsTable } from '../common/PropsTable';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';


export function ShowCaseTabs () {

    const tabsState = [
        { label: 'Tab 1', content: <TabContent1 /> },
        { label: 'Tab 2', content: <Lorem paragraphs={3} /> },
        { label: 'Tab 3', content: <Lorem /> },
    ];

    return <Fragment>
        <Section title="Tabs">
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <Tabs
                            tabs={[
                                {
                                    label: 'First',
                                    content: <div style={{ height: 200 }}>First tab content</div>
                                },
                                {
                                    label: 'Second',
                                    content: <div style={{ height: 200 }}>Second tab content</div>
                                },
                            ]}
                        />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight>{showcaseTabsSample}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Component usage" isOutstanding={true}>
                <p>
                    Tabs are created via <Monospace>Tabs</Monospace> component.
                    The main and required property is <Monospace>tabs</Monospace> list,
                    with each element required to have two properties:
                    <ul>
                        <li><Monospace>label</Monospace></li>
                        <li><Monospace>content</Monospace></li>
                    </ul>
                    Both of the properties accepts React nodes.
                </p>
            </Block>
            <Block title="Standard tabs">
                <p>
                    Tabs are shown and hidden when the relative section is clicked, so they
                    always exists in the DOM and the state is kept.
                </p>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <Tabs tabs={tabsState} />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{tabsStateSample}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
            <Block title="Compact tabs">
                <p>
                    Tabs content usually has the default page padding, but in case you need to
                    maximize and use the full space the <Monospace>compact</Monospace>
                    property can be set.
                </p>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <Tabs tabs={tabsState} compact={true} />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{tabsStateCompactSample}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Props />
        </Section>
    </Fragment>;
}

function TabContent1() {
    const [counter, setCounter] = useState(0);

    return <Fragment>
        <div>
            Counter value: {counter}
            <br />
            <Button classes={'small'} onClick={() => setCounter(counter + 1)}>
                Increment
            </Button>
        </div>
        <Lorem />
    </Fragment>;
}

function Props() {
    return <PropsTable propsList={[
        {
            propName: 'tabs',
            propType: 'list of objects',
            isRequired: true,
            description: <div>
                <p>
                    This is the component main property: a list of tab objects.
                    Each tab object has the following attributes:
                </p>

                <div style={{ width: '100% '}}>
                    <PropsTable title=''
                        widths={{ propName: 100, default: 75, }}
                        propsList={[
                            {
                                propName: 'label',
                                propType: 'node',
                                isRequired: true,
                                description: <div>Tab label</div>
                            },
                            {
                                propName: 'content',
                                propType: 'node',
                                isRequired: true,
                                description: <div>Tab content</div>
                            },
                        ]}
                    />
                </div>
            </div>
        },
        {
            propName: 'compact',
            propType: 'boolean',
            default: 'false',
            description: <div>
                Remove contents padding.
            </div>
        },
        {
            propName: 'rest',
            propType: 'spread',
            description: <div>
                Extra props are supported and applied to container element.
            </div>
        },
    ]} />;
}

const showcaseTabsSample = `<Tabs
    tabs={[
        {
            label: 'First',
            content: <div style={{ height: 200 }}>First tab content</div>
        },
        {
            label: 'Second',
            content: <div style={{ height: 200 }}>Second tab content</div>
        },
    ]}
/>
`;

const tabsStateSample = `// Optionally, declare a component
function TabContent1() {
    const [counter, setCounter] = useState(0);

    return <Fragment>
        <div>
            Counter value: {counter}
            <br />
            <Button classes={'small'} onClick={() => setCounter(counter + 1)}>
                Increment
            </Button>
        </div>
        <Lorem />
    </Fragment>;
}

// declare a list of objects
const tabsSample = [
    { label: 'Tab 1', content: <TabContent1 /> },
    { label: 'Tab 2', content: <Lorem paragraphs={3} /> },
    { label: 'Tab 3', content: <Lorem /> },
];

// then
<Tabs tabs={tabsSample} />
`;

const tabsStateCompactSample = `<Tabs tabs={tabsSample} compact={true} />`;
