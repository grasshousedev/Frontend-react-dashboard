import React, { Fragment, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Sidebar } from 'components/ui/Sidebar';
import { Lorem } from 'components/ui/Lorem';
import { Icon } from 'components/ui/Icon';
import { Monospace } from 'components/ui/Text';
import { propTypeChildren } from 'components/utils';
import { Button } from 'components/ui/Button';
import { PropsTable } from '../common/PropsTable';

const SidebarContextSample = createContext([{}, () => { console.log('NOOP'); return {}; }]);

const SidebarProviderSample = ({ children, initialStatus }) => {
    const [state, setState] = useState({ status: initialStatus });

    return <SidebarContextSample.Provider value={[state, setState]}>
        {children}
    </SidebarContextSample.Provider>;
};

SidebarProviderSample.propTypes = {
    children: propTypeChildren,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
};

export function ShowCaseSidebar() {
    return <Fragment>
        <Section title="Sidebar">
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <div style={{ height: 400, display: 'flex', border: '1px solid #ddd' }}>
                            <Sidebar
                                height={400}
                                top={(sidebarState) => {
                                    return <Fragment>
                                        <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard" onClick={() => window.alert('Dashboard clicked')}>
                                            Dashboard
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState} iconName="palette" link="/style-showcase">
                                            Style Showcase
                                        </Sidebar.Entry>
                                    </Fragment>;
                                }}
                                bottom={() => <Icon name="person" size="big" />}>
                            </Sidebar>
                            <Block isSeparated={false}>
                                <Lorem paragraphs={3} />
                            </Block>
                        </div>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="javascript">{sidebarSample}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Components usage" isOutstanding={true}>
                <p>
                    The Sidebar component must be rendered inside a <Monospace>flex</Monospace> container.
                    The component accepts two main properties: <Monospace>top</Monospace> and <Monospace>bottom</Monospace>.
                    These properties expect a function, which first argument is <Monospace>sidebarState</Monospace> and the second
                    is <Monospace>setSidebarState</Monospace>.
                    <br />
                    <Monospace>sidebarState</Monospace> has the following properties:
                </p>
                    <ul>
                        <li><Monospace>status</Monospace>: the status of the Sidebar, that can be <Monospace>open</Monospace> or <Monospace>closed</Monospace>.</li>
                        <li>
                            <Monospace>activeId</Monospace>: the entry ID to be considered active. If no ID are passed, the location
                            is used and matched with <Monospace>link</Monospace> value.
                        </li>
                    </ul>
                <p>
                    Height can be customized via <Monospace>height</Monospace> property.
                    <br />
                    If you need to use a different trigger than the default one, it can be hidden and a context can be passed.
                </p>
                <RowBlock>
                    <ColumnBlock>
                        <SidebarProviderSample>
                            <SidebarContextSampleComponent />
                        </SidebarProviderSample>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="javascript">{sidebarWithContextSample}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Block title="Entries">
                <p>
                    Sidebar elements can be done using the <Monospace>SidebarEntry</Monospace> component.
                    <br />
                    The sidebar state must be passed, usually taken as arugment via
                    <Monospace>top</Monospace> or <Monospace>bottom</Monospace> functions, or by using a context.
                    <br />
                    This component offers few shortcuts:
                        it can render an icon via the <Monospace>iconName</Monospace> attribute,
                        it can be used as a link via the <Monospace>link</Monospace> attribute (based on react-router)
                        or just render anything you pass (children property).
                </p>
                <p>
                    If no icon is provided, the <Monospace>shortcut</Monospace> attribute can be used to provide
                    a 2-letter label to be rendered in place of the icon.
                </p>
                <p>
                    If the <Monospace>id</Monospace> attribute is set, a <Monospace>div</Monospace>
                    with that ID will be rendered under the children, and it can be either filled with
                    <Monospace>details</Monospace> attribute (in a JSX like form) or be used to render content
                    with a Portal.
                </p>
                <p>
                    All other attributes are set via the <Monospace>rest</Monospace> spread.
                </p>
                <RowBlock>
                    <ColumnBlock>
                        <div style={{ height: 600, display: 'flex', border: '1px solid #ddd' }}>
                            <Sidebar
                                height={600}
                                top={(sidebarState, setSidebarState) => {
                                    return <Fragment>
                                        <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard"
                                            onClick={() => window.alert('Dashboard clicked! Set via rest spread')}
                                        >
                                            Dashboard
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState} iconName="palette"
                                            link="/style-showcase"
                                        >
                                            Style Showcase
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState} shortcut="SC" >
                                            Shortcut
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState}
                                            iconName="menu"
                                            id="showcase-entry-with-id"
                                            onClick={() => setSidebarState({ ...sidebarState, activeId: "showcase-entry-with-id" })}
                                            details={<ul><li>Row 1</li><li>Row 2</li></ul>}
                                        >
                                            With Details (click me)
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState}>
                                            <span>No Icon or shortcut</span>
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState}
                                            shortcut={null}
                                        >
                                            <span>No Icon or shortcut (with spacer)</span>
                                        </Sidebar.Entry>
                                        <Sidebar.Entry sidebarState={sidebarState}
                                            shortcut={'RS'}
                                            onClick={() => setSidebarState({ ...sidebarState, activeId: undefined })}
                                        >Reset Active State</Sidebar.Entry>
                                    </Fragment>;
                                }}
                                bottom={() => <Icon name="person" size="big" />}>
                            </Sidebar>
                            <Block isSeparated={false}>
                                <Lorem paragraphs={3} />
                            </Block>
                        </div>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="javascript">{sidebarEntriesSample}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Props />
        </Section>

    </Fragment>;
}

function SidebarContextSampleComponent() {
    const [sidebarStateSample, setSidebarStateSample] = useContext(SidebarContextSample);
    const height = 600;

    return <div style={{ height, display: 'flex', border: '1px solid #ddd' }}>
        <Sidebar
            height={height}
            sidebarContext={SidebarContextSample}
            top={(sidebarState) => {
                return <Fragment>
                    <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard" onClick={() => window.alert('Dashboard clicked')}>
                        Dashboard
                    </Sidebar.Entry>
                    <Sidebar.Entry sidebarState={sidebarState} iconName="palette" link="/style-showcase">
                        Style Showcase
                    </Sidebar.Entry>
                </Fragment>;
            }}
            bottom={() => <Icon name="person" size="big" />}>
        </Sidebar>
        <Block isSeparated={false}>
            <Block>
                <Button classes="primary" onClick={() => {
                    const status = sidebarStateSample.status;
                    console.log('clicked', status);
                    setSidebarStateSample({ ...sidebarStateSample, status: status === 'open' ? 'closed' : 'open'});
                }}>Toggle</Button>
            </Block>
            <Lorem paragraphs={3} />
        </Block>
    </div>;
}

function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'top',
            propType: 'function',
            description: <div>
                <Monospace>top</Monospace> attribute is a function that takes <Monospace>sidebarState</Monospace>
                as argument. It returns valid JSX that will be rendered on the top part of the sidebar.
                Usually it is a combination of <Monospace>Sidebar.Entry</Monospace> components.
            </div>
        },
        {
            propName: 'bottom',
            propType: 'function',
            description: <div>
                <Monospace>bottom</Monospace> attribute is a function that takes <Monospace>sidebarState</Monospace>
                as argument, in the same way of <Monospace>top</Monospace> attribute. This will be rendered in
                the bottom part of the dashboard.
            </div>
        },
        {
            propName: 'initialStatus',
            propType: 'string',
            default: 'closed',
            description: <div>
                Initial status of the sidebar. Possible values are:
                <ul>
                    <li><Monospace>open</Monospace></li>
                    <li><Monospace>closed</Monospace></li>
                </ul>
            </div>
        },
        {
            propName: 'disableTrigger',
            propType: 'boolean',
            description: <div>
                If <Monospace>true</Monospace>, the trigger will not be rendered.
                <br />
                This can be used to either leave the sidebar always open/closed or
                to use a separate trigger (see context example).
            </div>
        },
        {
            propName: 'height',
            propType: ['string', 'number'],
            description: <div>
                Height of the sidebar, will be set with <Monospace>style</Monospace> attribute.
            </div>
        },
        {
            propName: 'children',
            propType: 'node',
            description: <div>
                Children will be rendered in the top part of the sidebar after the oputput
                of the <Monospace>top</Monospace> function.
            </div>
        },
    ]} />;
}

const sidebarSample = `<div style={{ height: 400, display: 'flex' }}>
    <Sidebar
        height={400}
        top={(sidebarState) => {
            return <Fragment>
                <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard" onClick={() => window.alert('Dashboard clicked')}>
                    Dashboard
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState} iconName="palette" link="/style-showcase">
                    Style Showcase
                </Sidebar.Entry>
            </Fragment>;
        }}
        bottom={() => <Icon name="person" size="big" />}>
    </Sidebar>
    <Block isSeparated={false}>
        <Lorem paragraphs={3} />
    </Block>
</div>`;

const sidebarWithContextSample = `// Create a context and the provider component
const SidebarContextSample = createContext([{}, () => ({})]);

const SidebarProviderSample = ({ children, initialStatus }) => {
    const [state, setState] = useState({ status: initialStatus });

    return <SidebarContextSample.Provider value={[state, setState]}>
        {children}
    </SidebarContextSample.Provider>;
};

SidebarProviderSample.propTypes = {
    children: propTypeChildren,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
};

// Create a component that will be rendered inside the provider
function SidebarContextSampleComponent() {
    const [sidebarStateSample, setSidebarStateSample] = useContext(SidebarContextSample);

    return <div style={{ height: 400, display: 'flex' }}>
        <Sidebar
            height={400}
            sidebarContext={SidebarContextSample}
            top={(sidebarState) => {
                return <Fragment>
                    <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard"
                        onClick={() => window.alert('Dashboard clicked')}
                    >
                        Dashboard
                    </Sidebar.Entry>
                    <Sidebar.Entry sidebarState={sidebarState} iconName="palette"
                        link="/style-showcase"
                    >
                        Style Showcase
                    </Sidebar.Entry>
                </Fragment>;
            }}
            bottom={() => <Icon name="person" size="big" />}>
        </Sidebar>
        <Block isSeparated={false}>
            <Block>
                <Button classes="primary" onClick={() => {
                    const status = sidebarStateSample.status;
                    console.log('clicked', status);
                    setSidebarStateSample({ ...sidebarStateSample, status: status === 'open' ? 'closed' : 'open'});
                }}>Toggle</Button>
            </Block>
            <Lorem paragraphs={3} />
        </Block>
    </div>;
}

// Render the provider and call the comopnent
<SidebarProviderSample>
    <SidebarContextSampleComponent />
</SidebarProviderSample>`;

const sidebarEntriesSample = `<div style={{ height: 600, display: 'flex' }}>
    <Sidebar
        height={600}
        top={(sidebarState, setSidebarState) => {
            return <Fragment>
                <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard"
                    onClick={() => window.alert('Dashboard clicked! Set via rest spread')}
                >
                    Dashboard
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState} iconName="palette"
                    link="/style-showcase"
                >
                    Style Showcase
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState} shortcut="SC" >
                    Shortcut
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState}
                    iconName="menu"
                    id="showcase-entry-with-id"
                    onClick={() => setSidebarState({ ...sidebarState, activeId: "showcase-entry-with-id" })}
                    details={<ul><li>Row 1</li><li>Row 2</li></ul>}
                >
                    With Details (click me)
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState}>
                    <span>No Icon or shortcut</span>
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState}
                    shortcut={null}
                >
                    <span>No Icon or shortcut (with spacer)</span>
                </Sidebar.Entry>
                <Sidebar.Entry sidebarState={sidebarState}
                    shortcut={'RS'}
                    onClick={() => setSidebarState({ ...sidebarState, activeId: undefined })}
                >Reset Active State</Sidebar.Entry>
            </Fragment>;
        }}
        bottom={() => <Icon name="person" size="big" />}>
    </Sidebar>
    <Block isSeparated={false}>
        <Lorem paragraphs={3} />
    </Block>
</div>`;