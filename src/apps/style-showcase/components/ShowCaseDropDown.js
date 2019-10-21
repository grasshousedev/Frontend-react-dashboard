import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { DropDown, DROPDOWN_POSITIONS } from 'components/ui/DropDown';
import { Section } from 'components/ui/Section';
import { RowBlock, Block, ColumnBlock } from 'components/ui/Blocks';
import { Monospace } from 'components/ui/Text';

import { PropsTable } from '../common/PropsTable';

const showcaseSampleDropDown = `<DropDown trigger={<button className="ui-button">Click to Open Dropdown</button>}>
    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
    <DropDown.Divider />
    <DropDown.Entry>Non clickable row</DropDown.Entry>
</DropDown>`;

const showcaseSampleHoverDropDown = `<DropDown triggerOn="hover"
    trigger={<button className="ui-button">Hover to Open Dropdown</button>}
>
    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
    <DropDown.Divider />
    <DropDown.Entry>Non clickable row</DropDown.Entry>
</DropDown>`;

const cssDropDown = `<div className="ui-dropdown__outer-container">
    <div className="ui-dropdown__trigger ui-dropdown__trigger--manual">
        <button className="ui-button">Trigger</button>
        <div className="ui-dropdown__container">
            <div className="ui-dropdown__entry ui-dropdown__entry--clickable"
                onClick={() => window.alert('Clicked')}
            >Click me</div>
            <div className="ui-dropdown__divider" />
            <div className="ui-dropdown__entry">Non clickable</div>
        </div>
    </div>
</div>`;

const sampleDropDown = `import { DropDown } from 'components/ui/DropDown';

const Trigger = <i className="fas fa-cog" style={{ cursor: 'pointer' }} />;

<DropDown trigger={Trigger}>
    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
    <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
    <DropDown.Divider />
    <DropDown.Entry>Third row</DropDown.Entry>
</DropDown>`;

const sampleDropDownHover = `const Trigger = <i className="fas fa-cog" style={{ cursor: 'pointer' }} />;

<DropDown trigger={Trigger} triggerOn="hover">
    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
    <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
    <DropDown.Divider />
    <DropDown.Entry>Third row</DropDown.Entry>
</DropDown>}`;

export function ShowCaseDropDown() {
    return <Fragment>
        <Section title="Dropdowns">
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <DropDown trigger={<button className="ui-button">Click to Open Dropdown</button>}>
                            <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                            <DropDown.Divider />
                            <DropDown.Entry>Non clickable row</DropDown.Entry>
                        </DropDown>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{showcaseSampleDropDown}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
                <RowBlock>
                    <ColumnBlock>
                        <DropDown triggerOn="hover"
                            trigger={<button className="ui-button">Hover to Open Dropdown</button>}
                        >
                            <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                            <DropDown.Divider />
                            <DropDown.Entry>Non clickable row</DropDown.Entry>
                        </DropDown>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{showcaseSampleHoverDropDown}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Class">
            <Block title="Class usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <p>
                            To create a Dropdown with HTML and CSS, we need to create a container
                            for the trigger, the trigger and the container for the Dropdown.
                        </p>
                        <p>
                            In this case it will not be possible to place the Dropdown accordingly
                            to the available space, as it will always be in the same position
                            (aligned bottom left).
                        </p>

                        <Block>
                            <div className="ui-dropdown__outer-container">
                                <div className="ui-dropdown__trigger ui-dropdown__trigger--manual">
                                    <button className="ui-button">Trigger</button>
                                    <div className="ui-dropdown__container">
                                        <div className="ui-dropdown__entry ui-dropdown__entry--clickable"
                                            onClick={() => window.alert('Clicked')}
                                        >Click me</div>
                                        <div className="ui-dropdown__divider" />
                                        <div className="ui-dropdown__entry">Non clickable</div>
                                    </div>
                                </div>
                            </div>
                        </Block>

                        <p>
                            Note: the class <Monospace>ui-dropdown__trigger--manual</Monospace> does not follow BEM style as it needs to control a child element.
                        </p>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{cssDropDown}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Component usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <p>
                            The easies way to create a Dropdown is by using the <Monospace>Dropdown</Monospace> component
                        </p>
                        <p>
                            The only required property is <Monospace>trigger</Monospace>, which expects a Node (a string or a component for example).
                        </p>
                        <p>
                            Dropdown entries are then defined manually via two components: <Monospace>DropDown.Entry</Monospace> and <Monospace>DropDown.Divider</Monospace>.
                        </p>
                        <Block>
                            <DropDown trigger={<i className="fas fa-cog" style={{ cursor: 'pointer' }} />}>
                                <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                                <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
                                <DropDown.Divider />
                                <DropDown.Entry>Third row</DropDown.Entry>
                            </DropDown>
                        </Block>
                        <p>
                            By default, the Dropdown is shown when the trigger is clicked and
                            is hidden when another click is done, regardless of the position.
                        </p>
                        <p>
                            The Dropdown position is automatically adjusted based on the position in the window.
                            If it is too close to the right or bottom edges, it will flip accordingly.
                            The position can be also regulated via the <Monospace>position</Monospace> prop.
                        </p>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="javascript">{sampleDropDown}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Props />
        </Section>
    </Fragment>;
}


function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'trigger',
            propType: 'node',
            isRequired: true,
            description: <div>
                The element that will be used to trigger the Dropdown
            </div>
        },
        {
            propName: 'children',
            propType: 'node',
            description: <div>
                The Dropdown content, a mix of <Monospace>DropDown.Entry</Monospace> and <Monospace>DropDown.Divider</Monospace> elements.
            </div>
        },
        {
            propName: 'triggerOn',
            propType: 'string',
            default: 'click',
            description: <div>
                Determine in which way the Dropdown is shown. Possible values are:
                <ul>
                    <li><Monospace>click</Monospace></li>
                    <li><Monospace>hover</Monospace></li>
                </ul>

                <CodeHighlight language="xml">{sampleDropDownHover}</CodeHighlight>
            </div>
        },
        {
            propName: 'position',
            propType: 'string',
            default: DROPDOWN_POSITIONS.AUTO,
            description: <div>
                Determine the position of the Dropdown:
                <ul>
                    <li><Monospace>{DROPDOWN_POSITIONS.AUTO}</Monospace></li>
                    <li><Monospace>{DROPDOWN_POSITIONS.TOP_LEFT}</Monospace></li>
                    <li><Monospace>{DROPDOWN_POSITIONS.TOP_RIGHT}</Monospace></li>
                    <li><Monospace>{DROPDOWN_POSITIONS.BOTTOM_LEFT}</Monospace></li>
                    <li><Monospace>{DROPDOWN_POSITIONS.BOTTOM_RIGHT}</Monospace></li>
                </ul>
                If the position is {DROPDOWN_POSITIONS.AUTO}, then it will be automatically adjusted.
                <div className="flex-container--center-middle">
                    {getDropDownWithPosition(DROPDOWN_POSITIONS.TOP_LEFT)}
                    {getDropDownWithPosition(DROPDOWN_POSITIONS.TOP_RIGHT)}
                    {getDropDownWithPosition(DROPDOWN_POSITIONS.BOTTOM_LEFT)}
                    {getDropDownWithPosition(DROPDOWN_POSITIONS.BOTTOM_RIGHT)}
                </div>
            </div>
        },
        {
            propName: 'persist',
            propType: 'boolean',
            default: 'false',
            description: <div>
                If the <Monospace>trigger</Monospace> is <Monospace>hover</Monospace>,
                keeps the Dropdown open when the mouse is moved out and requires a click to be hidden.
                <Block>
                    <DropDown
                        trigger={<i className="fas fa-cog" style={{ cursor: 'pointer' }} />}
                        triggerOn="hover"
                        persist={true}
                    >
                        <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                        <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
                        <DropDown.Divider />
                        <DropDown.Entry>Third row</DropDown.Entry>
                    </DropDown>
                </Block>
            </div>
        },
    ]} />;
}

function getDropDownWithPosition(position) {
    return <div style={{ width: '120px', border: '1px solid red', margin: '15px', padding: '10px', textAlign: 'center' }}>
        <div>
            <pre style={{ display: 'inline' }}>{position}</pre>
        </div>
        <DropDown trigger={<i className="fas fa-cog" style={{ cursor: 'pointer' }} />} position={position}>
            <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
            <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
            <DropDown.Divider />
            <DropDown.Entry>Third row</DropDown.Entry>
        </DropDown>
    </div>;
}