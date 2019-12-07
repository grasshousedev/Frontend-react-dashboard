import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Button } from 'components/ui/Button';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Monospace } from 'components/ui/Text';
import { Section } from 'components/ui/Section';

import { PropsTable } from '../common/PropsTable';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';


export function ShowCaseButton() {
    return <Fragment>
        <Section title="Buttons">
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <p className="display-flex">
                            <button className="ui-button">Button</button>
                            <button className="ui-button ui-button--small">Button</button>
                            <button className="ui-button ui-button--small" disabled>Button</button>
                        </p>
                        <p className="display-flex">
                            <button className="ui-button ui-button--primary">Button</button>
                            <button className="ui-button ui-button--primary ui-button--small">Button</button>
                            <button className="ui-button ui-button--primary ui-button--small" disabled>Button</button>
                        </p>
                        <p className="display-flex">
                            <button className="ui-button ui-button--positive">Button</button>
                            <button className="ui-button ui-button--positive ui-button--small">Button</button>
                            <button className="ui-button ui-button--positive ui-button--small" disabled>Button</button>
                        </p>
                        <p className="display-flex">
                            <button className="ui-button ui-button--negative">Button</button>
                            <button className="ui-button ui-button--negative ui-button--small">Button</button>
                            <button className="ui-button ui-button--negative ui-button--small" disabled>Button</button>
                        </p>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <h3 className="ui-title">Class</h3>
                        <Block>
                            <CodeHighlight language="xml">{sampleButton}</CodeHighlight>
                        </Block>
                        <h3 className="ui-title">Component</h3>
                        <Block>
                            <CodeHighlight language="javascript">{sampleComponentButton}</CodeHighlight>
                        </Block>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Class">
            <Block title="Class usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        The basic way to create buttons is through classes.<br />
                        This is a simple button:
                        <div className="ui-text--boxed">
                            <button className="ui-button">Button label</button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{sampleButton}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
            <Block>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        Small buttons requires an extra <Monospace>ui-button--small</Monospace> class:
                        <div className="ui-text--boxed">
                            <button className="ui-button ui-button--small">Small button</button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{smallButton}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>

                <RowBlock>
                    <ColumnBlockCodeSplit>
                        Primary buttons (with primary color) are done with class <Monospace>ui-button--primary</Monospace>:
                        <div className="ui-text--boxed">
                            <button className="ui-button ui-button--primary">Primary button</button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{primaryButton}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>

                <RowBlock>
                    <ColumnBlockCodeSplit>
                        Two other special classes are available, <Monospace>ui-button--positive</Monospace> and <Monospace>ui-button--negative</Monospace>:
                        <div className="ui-text--boxed">
                            <button className="ui-button ui-button--positive">Positive button</button>
                            <button className="ui-button ui-button--negative">Negative button</button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{positiveNegativeButton}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Components usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        A component is also available.<br />
                        It takes few properties, and a label as child.<br />
                        <div className="ui-text--boxed">
                            <Button>Button label</Button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="javascript">{sampleComponentButton}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Props />
        </Section>
    </Fragment>;
}

function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'children',
            propType: 'node',
            description: <div>
                Label of the button, passed using <Monospace>children</Monospace> property
            </div>
        },
        {
            propName: 'tag',
            propType: ['string', 'object'],
            default: 'button',
            description: <div>
                Tag that will be used to create the button.
            </div>
        },
        {
            propName: 'onClick',
            propType: 'function',
            description: <div>
                <Block>
                    Function called when the button is clicked.
                </Block>
                <RowBlock>
                    <ColumnBlock>
                        <Button onClick={() => window.alert('test')}>Button label</Button>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{onClickComponentButton}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </div>
        },
        {
            propName: 'classes',
            propType: ['array', 'string'],
            description: <div>
                <Block>
                    Extra classes can be passed as an array. Each of the value will be prepended by <Monospace>ui-button--</Monospace>:
                    <ul>
                        <li><Monospace>primary</Monospace></li>
                        <li><Monospace>small</Monospace></li>
                    </ul>
                    You can pass any extra value and this will be prepended as well.
                </Block>
                <RowBlock>
                    <ColumnBlock>
                        <Button classes={["small", "primary"]}>Small primary button</Button>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{classesStringComponentButton}</CodeHighlight>
                        <CodeHighlight language="xml">{classesComponentButton}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </div>
        },
        {
            propName: 'disabled',
            propType: 'boolean',
            description: <div>
                <Block>
                    Set the disable property (and auto appends the right disabled class)
                </Block>
                <RowBlock>
                    <ColumnBlock>
                        <Button classes="small" disabled>Disabled button</Button>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{disabledComponentButton}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </div>
        },
        {
            propName: 'type',
            propType: 'string',
            default: 'button',
            description: <div>
                By default the button type is <Monospace>button</Monospace>.
            </div>
        }
    ]} />;
}

const sampleButton = `<button className="ui-button">Button label</button>`;
const smallButton = `<button className="ui-button ui-button--small">Small button</button>`;
const primaryButton = `<button className="ui-button ui-button--primary">Primary button</button>`;
const positiveNegativeButton = `<button className="ui-button ui-button--positive">Positive button</button>
<button className="ui-button ui-button--negative">Negative button</button>`;

const sampleComponentButton = `import { Button } from 'components/ui/Button';
<Button>Button label</Button>`;
const onClickComponentButton = `<Button onClick={() => window.alert('test')}>Button label</Button>`;
const classesComponentButton = `<Button classes={["small", "primary"]}>Small button</Button>`;
const classesStringComponentButton = `<Button classes="small">Small button</Button>`;
const disabledComponentButton = `<Button classes="small" disabled>Disabled button</Button>`;

