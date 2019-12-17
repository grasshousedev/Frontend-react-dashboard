import React, { Fragment } from 'react';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { ModalTrigger } from 'components/ui/Modal';
import { Section } from 'components/ui/Section';
import { Block, RowBlock } from 'components/ui/Blocks';
import { Button } from 'components/ui/Button';
import { Monospace } from 'components/ui/Text';
import { PropsTable } from '../common/PropsTable';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';


export function ShowCaseModal() {

    return <Fragment>
        <Section title="Modal">
            <Block title="Showcase" isOutstanding={true}>
                <SimpleModal />
                <SmallModal />
                <CustomWrapperModal />
                <NoFooterModal />
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Optional Root" isOutstanding={true}>
                <Monospace>ModalTrigger</Monospace> component requires a Div with ID
                <Monospace>modal-root</Monospace>.
                <br />
                If this element is not found, a new Div will be added to the document body.
            </Block>
            <Block title="Component usage" isOutstanding={true}>
                <Block>
                    Modals can be created via <Monospace>ModalTrigger</Monospace> component.
                    Two properties are mandatory: <Monospace>Trigger</Monospace> and
                    <Monospace>getModalWindowProps</Monospace>.
                </Block>

                <Block>
                    They are both functions, which accept arguments needed to open the modal and
                    control the behaviour, the style and the lifecycle.
                </Block>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <ModalTrigger
                            Trigger={({ setViewModalWindow }) =>
                                <Button onClick={() => setViewModalWindow(true)}>Open Modal</Button>
                            }
                            getModalWindowProps={({ setViewModalWindow }) => {
                                return {
                                    title: 'Modal',
                                    content: <div><Lorem /></div>,
                                    footer: <Fragment>
                                        <div>Left element</div>
                                        <Button classes='primary' onClick={() => setViewModalWindow(false)}>Close</Button>
                                    </Fragment>
                                };
                            }}
                        />
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight>{componentUsageSample}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Block title="Examples">
                <p>The following examples are related to the buttons on the main showcase.</p>

                <h3>Open Modal (with hooks)</h3>
                <CodeHighlight>{openModalSample}</CodeHighlight>

                <hr className="ui-divider" />

                <h3>Open Small Modal (not resizable)</h3>
                <CodeHighlight>{openSmallModalSample}</CodeHighlight>

                <hr className="ui-divider" />

                <h3>Open Custom Class Modal (with a defined class for the wrapper)</h3>
                <CodeHighlight>{openCustomClassModalSample}</CodeHighlight>

                <hr className="ui-divider" />

                <h3>Open Modal without Footer</h3>
                <CodeHighlight>{openModalWithoutFooterSample}</CodeHighlight>

            </Block>

            <ModalTriggerProps />
            <TriggerProps />
            <GetModalWindowPropsProps />
            <GetModalWindowPropsReturnObject />
        </Section>

    </Fragment>;
}

function ModalTriggerProps() {
    return <PropsTable title="ModalTrigger props" propsList={[
        {
            propName: 'Trigger',
            propType: 'function',
            isRequired: true,
            description: <div>
                The function called when rendering the trigger to open the modal.
                <br />
                For the full list of arguments see table below.
            </div>
        },
        {
            propName: 'getModalWindowProps',
            propType: 'function',
            isRequired: true,
            description: <div>
                The function called when the modal Trigger is clicked and properties for the Modal Window are generated.
                <br />
                For the full list of arguments see table below.
            </div>
        },
    ]} />;
}

function TriggerProps() {
    return <PropsTable title="Trigger arguments" propsList={[
        {
            propName: 'setViewModalWindow',
            propType: 'function',
            isRequired: true,
            description: <div>
                This function is used to set the visibility of the modal window, and accept a
                <Monospace>view</Monospace> boolean as only argument.
            </div>
        },
    ]} />;
}

function GetModalWindowPropsProps() {
    return <PropsTable title="getModalWindowProps arguments" propsList={[
        {
            propName: 'setViewModalWindow',
            propType: 'function',
            isRequired: true,
            description: <div>
                This function is used to set the visibility of the modal window, and accept a
                <Monospace>view</Monospace> boolean as only argument.
            </div>
        },

    ]} />;
}
function GetModalWindowPropsReturnObject() {
    return <PropsTable title="getModalWindowProps result object" propsList={[
        {
            propName: 'title',
            propType: 'node',
            description: <div>
                Modal title, will appear on top.
            </div>
        },
        {
            propName: 'content',
            propType: 'node',
            description: <div>
                Modal main content.
            </div>
        },
        {
            propName: 'footer',
            propType: 'node',
            description: <div>
                Modal footer. Elements are wrapped around a <Monospace>flex</Monospace> display container
                with <Monospace>space-between</Monospace> justify-content.
            </div>
        },
        {
            propName: 'closeModal',
            propType: 'function',
            description: <div>
                Function called when the close modal icon is clicked.
                If something needs to be done before exiting, like getting some values or
                showing an alert, this function can be passed to match the one that will be
                used in a `cancel` or `close` button in the footer.
            </div>
        },
        {
            propName: 'maximized',
            propType: 'boolean',
            default: 'false',
            description: <div>
                If <Monospace>true</Monospace>, the modal is open maximized.
            </div>
        },
        {
            propName: 'canMaximize',
            propType: 'boolean',
            default: 'true',
            description: <div>
                If the modal can be maximized or not.
            </div>
        },
        {
            propName: 'startHeight',
            propType: 'string',
            default: '400px',
            description: <div>
                Initial modal height.
            </div>
        },
        {
            propName: 'startWidth',
            propType: 'string',
            default: '70%',
            description: <div>
                Initial modal width.
            </div>
        },
        {
            propName: 'wrapperClass',
            propType: 'string',
            description: <div>
                Class added to the wrapper.
            </div>
        },
        {
            propName: 'hooks',
            propType: 'object',
            description: <div>
                The following Hooks are available to catch when an action is done:
                <ul>
                    <li>
                        <Monospace>onOpen</Monospace>: promise that receive an object
                        as argument with keys <Monospace>resolve</Monospace> and
                        <Monospace>reject</Monospace>
                    </li>
                </ul>

            </div>
        },

    ]} />;
}

const componentUsageSample = `import { ModalTrigger } from 'components/ui/Modal';

<ModalTrigger
    Trigger={({ setViewModalWindow }) =>
        <Button onClick={() => setViewModalWindow(true)}>Open Modal</Button>
    }
    getModalWindowProps={({ setViewModalWindow }) => {
        return {
            title: 'Modal',
            content: <div><Lorem /></div>,
            footer: <Fragment>
                <div>Left element</div>
                <Button classes='primary'
                    onClick={() => setViewModalWindow(false)}
                >Close</Button>
            </Fragment>
        };
    }}
/>`;


const openModalSample = `// Trigger and modal window props are passed to ModalTrigger
<ModalTrigger
    Trigger={({ setViewModalWindow }) => <button onClick={() => setViewModalWindow(true)}>Open Modal</button>}
    getModalWindowProps={({ setViewModalWindow }) => {
        // Function is called with setViewModalWindow (true -> show, false -> destroy)

        // Define a closeModal function, so the effect will be the same with a close button or x icon
        // If no closeModal is defined, setViewModalWindow(false) is called automatically from x icon
        const closeModal = ({ source }) => {
            const closePromise = new Promise((resolve, reject) => {
                if (window.confirm('Are you sure you want to close?')) resolve();
                else reject();
            });

            closePromise.then(() => {
                setViewModalWindow(false);
                // Use setTimeout to be sure modal is not visible, otherwise just call function
                setTimeout(() => {
                    window.alert('Modal has been closed.');
                }, 1);
            }).catch(() => {});
        };

        return {
            title: 'Hello world modal!',
            content: <div><Lorem /></div>,
            footer: <Fragment>
                <div>
                    This will be on the left
                </div>
                <div>
                    This will be on the right.
                    <button
                        className="ui-button ui-button--primary" style={{ marginLeft: '1rem' }}
                        onClick={() => closeModal('close button')}
                    >Close me!</button>
                </div>
            </Fragment>,
            closeModal,
            hooks: {
                onOpen: ({ resolve }) => {
                    setTimeout(() => { resolve(); }, 2000);
                },
            }
        };
    }}
/>
`;

const openSmallModalSample = `// A small modal not resizable
<ModalTrigger
    Trigger={({ setViewModalWindow }) =>
        <button className="ui-button" onClick={() => setViewModalWindow(true)}>Open Small Modal</button>}
    getModalWindowProps={({ setViewModalWindow }) => {
        return {
            title: 'Small Modal',
            content: <div><Lorem /></div>,
            footer: <div><button onClick={() => setViewModalWindow(false)}>Close</button></div>,
            startWidth: '300px',
            startHeight: '200px',
            canMaximize: false,
        };
    }}
/>
`;

const openCustomClassModalSample = `// The custom class is passed as wrapperClass
<ModalTrigger
    Trigger={({ setViewModalWindow }) =>
        <button className="ui-button" style={{ marginLeft: '10px' }}
            onClick={() => setViewModalWindow(true)}>Open Custom Class Modal</button>
    }
    getModalWindowProps={({ setViewModalWindow }) => {
        return {
            title: 'Custom Class Modal',
            content: <div><Lorem /></div>,
            footer: <Fragment>
                <div />
                <button className="ui-button ui-button--primary" onClick={() => setViewModalWindow(false)}>Close</button>
            </Fragment>,
            wrapperClass: 'style-showcase__modals__custom-wrapper'
        };
    }}
/>
`;

const openModalWithoutFooterSample = `// Do not pass footer property
<ModalTrigger
    Trigger={({ setViewModalWindow }) =>
        <button className="ui-button ui-button--small" style={{ marginLeft: '10px' }}
            onClick={() => setViewModalWindow(true)}>Open Modal without Footer</button>
    }
    getModalWindowProps={({ setViewModalWindow }) => {
        return {
            title: 'Modal without Footer',
            content: <div><Lorem /> <Lorem /></div>,
        };
    }}
/>
`;

const SimpleModal = function() {
    return <ModalTrigger
        Trigger={({ setViewModalWindow }) =>
            <Button classes='small' onClick={() => setViewModalWindow(true)}>
                Open Modal
            </Button>
        }
        getModalWindowProps={({ setViewModalWindow }) => {

            const closeModal = ({ source }) => {
                const closePromise = new Promise((resolve, reject) => {
                    if (window.confirm('Are you sure you want to close?')) resolve();
                    else reject();
                });

                closePromise.then(() => {
                    setViewModalWindow(false);
                    setTimeout(() => {
                        window.alert('Modal has been closed.');
                    }, 1);
                }).catch(() => {});
            };

            return {
                title: 'Hello world modal!',
                content: <div><Lorem /></div>,
                footer: <Fragment>
                    <div>This will be on the left</div>
                    <div>
                        This will be on the right.
                        <Button classes='primary' style={{ marginLeft: '1rem' }}
                            onClick={closeModal}>Close me!</Button>
                    </div>
                </Fragment>,
                closeModal,
                hooks: {
                    onOpen: ({ resolve }) => {
                        setTimeout(() => { resolve(); }, 2000);
                    },
                }
            };
        }}
    />;
};

const SmallModal = function() {
    return <ModalTrigger
        Trigger={({ setViewModalWindow }) =>
            <Button classes='small' onClick={() => setViewModalWindow(true)}>
                Open Small Modal
            </Button>
        }
        getModalWindowProps={({ setViewModalWindow }) => {
            return {
                title: 'Small Modal',
                content: <div><Lorem /></div>,
                footer: <Fragment>
                    <div />
                    <Button classes='primary' onClick={() => setViewModalWindow(false)}>
                        Close</Button>
                </Fragment>,
                startWidth: '300px',
                startHeight: '200px',
                canMaximize: false,
            };
        }}
    />;
};

const CustomWrapperModal = function() {
    return <ModalTrigger
        Trigger={({ setViewModalWindow }) =>
            <Button classes='small' onClick={() => setViewModalWindow(true)}>
                Open Custom Class Modal
            </Button>
        }
        getModalWindowProps={({ setViewModalWindow }) => {
            return {
                title: 'Custom Class Modal',
                content: <div><Lorem /></div>,
                footer: <Fragment>
                    <div />
                    <Button classes='primary' onClick={() => setViewModalWindow(false)}>
                        Close</Button>
                </Fragment>,
                wrapperClass: 'style-showcase__modals__custom-wrapper'
            };
        }}
    />;
};

const NoFooterModal = function() {
    return <ModalTrigger
        Trigger={({ setViewModalWindow }) =>
            <button className="ui-button ui-button--small"
                onClick={() => setViewModalWindow(true)}>Open Modal without Footer</button>
        }
        getModalWindowProps={() => {
            return {
                title: 'Modal without Footer',
                content: <div><Lorem /><Lorem /></div>,
            };
        }}
    />;
};
