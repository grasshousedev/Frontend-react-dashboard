import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Block, RowBlock } from 'components/ui/Blocks';
import { Button } from 'components/ui/Button';
import { Lorem } from 'components/ui/Lorem';
import { Section } from 'components/ui/Section';
import { SidePanel, DEFAULT_SIDE_PANEL_WIDTH } from 'components/ui/SidePanel';
import { Monospace } from 'components/ui/Text';

import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';
import { PropsTable } from '../common/PropsTable';


export function ShowCaseSidePanel () {
    return <Fragment>
        <Section>
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <div>Click the button to open the side panel:</div>
                        <SidePanel
                            Trigger={({ setVisible }) =>
                                <Button onClick={() => setVisible(true)}>Open</Button>
                            }
                            getSidePanelContentProps={({ setVisible }) => ({
                                content: <div>
                                    <Lorem paragraphs={3} />
                                    <Lorem paragraphs={3} />
                                    <Lorem paragraphs={3} />
                                    <Lorem paragraphs={3} />
                                </div>,
                                title: 'Side Panel Demo',
                                footer: <Fragment>
                                    <div>This is the footer</div>
                                    <div>
                                        <Button classes={['primary']}
                                            onClick={() => window.alert('Test')}>Test</Button>
                                        <Button classes={['negative']}
                                            onClick={() => setVisible(false)}>Close</Button>
                                    </div>
                                </Fragment>
                            })}
                        />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{sidePanelShowCase}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Optional requirement" isOutstanding={true}>
                <Monospace>SidePanel</Monospace> component requires a Div with ID
                <Monospace>side-panel-root</Monospace> and class <Monospace>ui-side-panel</Monospace>.
                <br />
                If this element is not found, a new Div will be added to the document body.
            </Block>
            <Block title="Component usage" isOutstanding={true}>
                <RowBlock>
                <ColumnBlockCodeSplit>
                        <div>This side panel uses available hooks:</div>
                        <SidePanel
                            Trigger={({ setVisible }) =>
                                <Button onClick={() => setVisible(true)}>Open</Button>
                            }
                            getSidePanelContentProps={() => ({
                                content: <div>
                                    <Lorem paragraphs={3} />
                                    <Lorem paragraphs={3} />
                                </div>,
                                title: 'Side Panel Demo With Hook',
                                hooks: {
                                    onOpen: ({ resolve }) => {
                                        setTimeout(() => resolve(), 3000);
                                    }
                                }
                            })}
                        />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight>{hooksSample}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Props />
            <GetSidePanelContentProps />
        </Section>
    </Fragment>;
}


function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'Trigger',
            propType: ['node', 'function'],
            isRequired: true,
            description: <div>
                Element that will be shown. When clicked, will open the side panel and render the content.
            </div>
        },
        {
            propName: 'getSidePanelContentProps',
            propType: 'function',
            description: <div>
                Function called when the visible status is set to <Monospace>true</Monospace>.
                The output of this function should be an object with keys described in the below table.
            </div>
        },
    ]} />;
}

function GetSidePanelContentProps() {
    return <PropsTable title="getSidePanelContentProps object" propsList={[
        {
            propName: 'content',
            propType: ['node', 'function'],
            isRequired: true,
            description: <div>
                The content of the side panel.
            </div>
        },
        {
            propName: 'title',
            propType: ['node', 'function'],
            description: <div>
                The title of the side panel. This will be rendered in the header.
            </div>
        },
        {
            propName: 'controls',
            propType: ['node', 'function'],
            description: <div>
                Placeholder to render additional buttons/elements. The {"Close"} button will always render.
            </div>
        },
        {
            propName: 'footer',
            propType: ['node', 'function'],
            description: <div>
                Footer content, will be rendered under Content. The footer container class is a flex container with
                <Monospace>justify-content: space-between</Monospace> property.
            </div>
        },
        {
            propName: 'hooks',
            propType: 'object',
            description: <div>
                Object that allows to define some hooks. Valid keys are:
                <ul>
                    <Monospace>onOpen</Monospace>: function called when the side panel is opened,
                    can expect an object with two keys, <Monospace>resolve</Monospace> and
                    <Monospace>reject</Monospace> a promise;
                    when the promise is resolved the panel will show the content.
                </ul>
            </div>
        },
        {
            propName: 'width',
            propType: ['number', 'string'],
            default: DEFAULT_SIDE_PANEL_WIDTH,
            description: <div>
                Width of the side panel.
            </div>
        },
        {
            propName: 'contentWidth',
            propType: ['number', 'string'],
            default: DEFAULT_SIDE_PANEL_WIDTH,
            description: <div>
                Width of the inner part of side panel. This will be relative to the side panel, so setting a percentage
                will not use the screen width but the panel instead.
            </div>
        },
    ]} />;
}


const sidePanelShowCase = `<SidePanel
    Trigger={({ setVisible }) => <Button onClick={() =>
        setVisible(true)}>Open</Button>
    }
    getSidePanelContentProps={({ setVisible }) => ({
        content: <div>
            <Lorem paragraphs={3} />
            <Lorem paragraphs={3} />
            <Lorem paragraphs={3} />
            <Lorem paragraphs={3} />
        </div>,
        title: 'Side Panel Demo',
        footer: <Fragment>
            <div>This is the footer</div>
            <div>
                <Button classes={['primary']}
                    onClick={() => window.alert('Test')}>Test</Button>
                <Button classes={['negative']}
                    onClick={() => setVisible(false)}>Close</Button>
            </div>
        </Fragment>
    })}
/>`;

const hooksSample = `<SidePanel
    Trigger={({ setVisible }) =>
        <Button onClick={() => setVisible(true)}>Open</Button>
    }
    getSidePanelContentProps={() => ({
        content: <div>
            <Lorem paragraphs={3} />
            <Lorem paragraphs={3} />
        </div>,
        title: 'Side Panel Demo With Hook',
        hooks: {
            onOpen: ({ resolve }) => {
                setTimeout(() => resolve(), 3000);
            }
        }
    })}
/>`;
