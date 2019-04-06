import React, { Fragment } from 'react';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { ModalTrigger } from 'components/ui/Modal';


export function ModalComponent() {

    return <div>
        <ModalTrigger
            Trigger={({ setViewModalWindow }) =>
                <button className="ui-button ui-button--small"
                    onClick={() => setViewModalWindow(true)}>Open Modal</button>
            }
            getModalWindowProps={({ setViewModalWindow }) => {
           
                const closeModal = ({ source }) => {
                    console.log('Modal closed from', source);

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
                        <div>
                            This will be on the left
                        </div>
                        <div>
                            This will be on the right. 
                            <button className="ui-button ui-button--primary" style={{ marginLeft: '1rem' }} onClick={closeModal}>Close me!</button>
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

        <ModalTrigger
            Trigger={({ setViewModalWindow }) =>
                <button className="ui-button ui-button--small" style={{ marginLeft: '10px' }}
                    onClick={() => setViewModalWindow(true)}>Open Small Modal</button>
            }
            getModalWindowProps={({ setViewModalWindow }) => {           
                return {
                    title: 'Small Modal',
                    content: <div><Lorem /></div>,
                    footer: <Fragment>                        
                        <div />
                        <button className="ui-button ui-button--primary" onClick={() => setViewModalWindow(false)}>Close</button>
                    </Fragment>,
                    startWidth: '300px',
                    startHeight: '200px',
                    canMaximize: false,
                };
            }}
        />        

        <ModalTrigger
            Trigger={({ setViewModalWindow }) =>
                <button className="ui-button ui-button--small" style={{ marginLeft: '10px' }}
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

        <hr className="ui-divider" style={{ marginTop: '1rem' }} />

        <h2>Open Modal (with hooks)</h2>
        <CodeHighlight>{openModalSample}</CodeHighlight>

        <hr className="ui-divider" />

        <h2>Open Small Modal (not resizable)</h2>
        <CodeHighlight>{openSmallModalSample}</CodeHighlight>

        <hr className="ui-divider" />

        <h2>Open Custom Class Modal (with a defined class for the wrapper)</h2>
        <CodeHighlight>{openCustomClassModalSample}</CodeHighlight>

        <hr className="ui-divider" />

        <h2>Open Modal without Footer</h2>
        <CodeHighlight>{openModalWithoutFooterSample}</CodeHighlight>
    </div>;
}

const openModalSample = `// Trigger and modal window props are passed to ModalTrigger
<ModalTrigger
    Trigger={({ setViewModalWindow }) => <button onClick={() => setViewModalWindow(true)}>Open Modal</button>}
    getModalWindowProps={({ setViewModalWindow }) => {
        // Function is called with setViewModalWindow (true -> show, false -> destroy)
        
        // Define a closeModal function, so the effect will be the same with a close button or x icon
        // If no closeModal is defined, setViewModalWindow(false) is called automatically from x icon
        const closeModal = ({ source }) => {
            console.log('Modal closed from', source);
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