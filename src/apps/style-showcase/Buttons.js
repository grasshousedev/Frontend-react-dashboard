import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Button } from 'components/ui/Button';

const sampleButton = `<button className="ui-button">Button label</button>`;
const smallButton = `<button className="ui-button ui-button--small">Small button</button>`;
const primaryButton = `<button className="ui-button ui-button--primary">Primary button</button>`;
const positiveButton = `<button className="ui-button ui-button--positive">Positive button</button>`;
const negativeButton = `<button className="ui-button ui-button--negative">Negative button</button>`;

const sampleComponentButton = `import { Button } from 'components/ui/Button';
<Button>Button label</Button>`;
const onClickComponentButton = `<Button onClick={() => window.alert('test')}>Button label</Button>`;
const classesComponentButton = `<Button classes={["small", "primary"]}>Small button</Button>`;
const classesStringComponentButton = `<Button classes="small">Small button</Button>`;
const disabledComponentButton = `<Button classes="small" disabled>Disabled button</Button>`;

export function Buttons() {
    return <Fragment>
        <h2>Buttons</h2>
        <h3>Showcase</h3>
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
        <h3>Classes usage</h3>
        <div>
            The basic way to create buttons is through classes.<br />
            This is a simple button: <button className="ui-button">Button label</button>
        </div>
        <CodeHighlight language="xml">{sampleButton}</CodeHighlight>
        <div>
            Small buttons requires an extra <pre style={{ display: 'inline' }}>ui-button--small</pre> class:
            <button className="ui-button ui-button--small">Small button</button>
        </div>
        <CodeHighlight language="xml">{smallButton}</CodeHighlight>
        <div>
            Primary buttons (with primary color) are done with class <pre style={{ display: 'inline' }}>ui-button--primary</pre>:
            <button className="ui-button ui-button--primary">Primary button</button>
        </div>
        <CodeHighlight language="xml">{primaryButton}</CodeHighlight>
        <div>
            Two other special classes are available, <pre style={{ display: 'inline' }}>ui-button--positive</pre> and <pre style={{ display: 'inline' }}>ui-button--negative</pre>:
            <button className="ui-button ui-button--positive">Positive button</button>
            <button className="ui-button ui-button--negative">Negative button</button>
        </div>
        <CodeHighlight language="xml">{positiveButton} {negativeButton}</CodeHighlight>

        <h3>Component usage</h3>
        <div>
            A component is also available.<br />
            It takes few properties, and a label as child.<br />
            <Button>Button label</Button>
        </div>
        <h4>Props</h4>
        <CodeHighlight language="typescript">{sampleComponentButton}</CodeHighlight>
        <div>
            <pre style={{ display: 'inline' }}>onClick</pre> prop can be passed to react on click<br />
            <Button onClick={() => window.alert('test')}>Button label</Button>
        </div>
        <CodeHighlight language="typescript">{onClickComponentButton}</CodeHighlight>
        <div>
            <pre style={{ display: 'inline' }}>classes</pre> prop can be used to pass extra classes:<br />
            <Button classes={["small", "primary"]}>Small primary button</Button>
        </div>
        <CodeHighlight language="typescript">{classesComponentButton}</CodeHighlight>
        <div>
            <pre style={{ display: 'inline' }}>classes</pre> can also be a string:<br />
            <Button classes="small">Small button</Button>
        </div>
        <CodeHighlight language="typescript">{classesStringComponentButton}</CodeHighlight>
        <div>
            <pre style={{ display: 'inline' }}>disabled</pre> prop set the disable property:<br />
            <Button classes="small" disabled>Disabled button</Button>
        </div>
        <CodeHighlight language="typescript">{disabledComponentButton}</CodeHighlight>

    </Fragment>;
}