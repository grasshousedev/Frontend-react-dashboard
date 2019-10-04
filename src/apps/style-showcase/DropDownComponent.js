import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { DropDown } from 'components/ui/DropDown';

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

export function DropDownComponent() {
    return <Fragment>
        <h2>Buttons</h2>
        <h3>Showcase</h3>
        <p className="display-flex">
            <button className="ui-button">Button</button>
            <button className="ui-button ui-button--small">Button</button>
            <button className="ui-button ui-button--small" disabled>Button</button>
        </p>

        <h3>Component usage</h3>
        <div>
            Dropdowns can be created with <pre style={{ display: 'inline' }}>DropDown</pre> component.<br />
            It expects a <pre style={{ display: 'inline' }}>trigger</pre> property that will be shown and used as reference for the dropdown position.

            <div className="flex-container--center-middle">
                <DropDown trigger={<i className="fas fa-cog" style={{ cursor: 'pointer' }} />}>
                    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                    <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
                    <DropDown.Divider />
                    <DropDown.Entry>Third row</DropDown.Entry>
                </DropDown>
            </div>

            <CodeHighlight language="jsx">{sampleDropDown}</CodeHighlight>
        </div>
        <h4>Props</h4>
        <div className="m-b-10">
            <pre style={{ display: 'inline' }}>trigger</pre> prop is used to create an element that will be used to toggle the menu.<br />
        </div>
        <div>
            <pre style={{ display: 'inline' }}>triggerOn</pre> prop can be used to determine in which way the dropdown menu will be shown. Two values are allowed:<br />
            <ul>
                <li><pre style={{ display: 'inline' }}>click</pre></li>
                <li><pre style={{ display: 'inline' }}>hover</pre></li>
            </ul>
            The following example shows a <pre style={{ display: 'inline' }}>hover</pre> value:
            <div className="flex-container--center-middle">
                <DropDown trigger={<i className="fas fa-cog" style={{ cursor: 'pointer' }} />} triggerOn="hover">
                    <DropDown.Entry onClick={() => window.alert('first row clicked')}>First row</DropDown.Entry>
                    <DropDown.Entry onClick={() => window.alert('second row clicked')}>Second row</DropDown.Entry>
                    <DropDown.Divider />
                    <DropDown.Entry>Third row</DropDown.Entry>
                </DropDown>
            </div>
            <CodeHighlight language="javascript">{sampleDropDownHover}</CodeHighlight>
        </div>
        <div className="m-b-20">
            <pre style={{ display: 'inline' }}>position</pre> prop can be used to set the position. By default the value is `auto`: it will be on bottom left by default, or bottom right if the viewport is over.
            <br />
            Other possible values are the following:
            <div className="flex-container--center-middle">
                {getDropDownWithPosition('top-left')}
                {getDropDownWithPosition('top-right')}
                {getDropDownWithPosition('bottom-left')}
                {getDropDownWithPosition('bottom-right')}
            </div>
        </div>
    </Fragment>;
}

function getDropDownWithPosition(position) {
    return <div style={{ width: '100px', border: '1px solid red', margin: '15px', padding: '10px', textAlign: 'center' }}>
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