import React, { Fragment } from 'react';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { ModalTrigger } from 'components/ui/Modal';

const sample = `// declare a list of objects
const events = [
    { title: '12-Dec-2019', content: <Lorem /> },
    { title: '01-Jan-2020', content: <Lorem paragraphs={3} /> },
    { title: '08-Feb-2020', content: <Lorem paragraphs={1} />, description: 'This is a description below the date' },
    { title: '27-Jul-2021', content: <Lorem /> },
];
// then
<Timeline events={events} />
`;

export function ModalComponent() {
    return <div>
        <ModalTrigger
            Trigger={({ setViewModalWindow }) => <button onClick={() => setViewModalWindow(true)}>Open Modal</button>}
            getModalWindowProps={({ setViewModalWindow }) => ({
                title: 'Hello world modal!',
                content: <div><Lorem /></div>,
                footer: <Fragment>
                    <div>
                        This will be on the left
                    </div>
                    <div>
                        This will be on the right. 
                        <button className="ui-button ui-button--primary" style={{ marginLeft: '1rem' }} onClick={() => setViewModalWindow(false)}>Close me!</button>
                    </div>
                </Fragment>,
                hooks: {
                    onOpen: ({ resolve }) => {
                        setTimeout(() => { resolve(); }, 2000);
                    },
                    onClose: ({ resolve, reject }) => {
                        if (window.confirm('Are you sure you want to close?')) resolve();
                        else reject();
                    },
                    onClosed: () => { window.alert('Modal has been closed.'); },
                }
            })}
        />        
        <CodeHighlight>{sample}</CodeHighlight>
    </div>;
}


/*
        <div className="ui-modal__wrapper">
            <div className="ui-modal__container ui-modal__container--maximized">
                <div className="ui-modal__header">
                    <div className="ui-modal__title">
                        Hello world modal!
                    </div>
                    <div className="ui-modal__controls">
                        <i className="fas fa-window-maximize ui-modal__control" />
                        <i className="fas fa-times ui-modal__control" />
                    </div>
                </div>
                <div className="ui-modal__content ui-modal__content--header-footer">
                    
                </div>
                <div className="ui-modal__footer">
                </div>
            </div>
        </div>

*/