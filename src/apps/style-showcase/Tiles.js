import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';

const sampleInline = `// Use "ui-tiles__container" and "ui-tiles"
// to get the standard size
<div className="ui-tiles__container ui-tiles">
    <div className="ui-tiles__tile">
        <div className="ui-tiles__tile__icon">
            <i className="fas fa-user" />
        </div>
        <div className="ui-tiles__tile__label">
            Users
        </div>
    </div>
    <div className="ui-tiles__tile">
        <div className="ui-tiles__tile__icon">
            <i className="fas fa-address-book" />
        </div>
        <div className="ui-tiles__tile__label">
            Address Book
        </div>
    </div>
</div>
`;

export function Tiles () {    
    return <Fragment>
        <h2>Tiles</h2>
        <h3>Standard size</h3>
        <div>
            This is a group of tiles with standard size. Use `ui-tiles__container` and `ui-tiles` together:
            <div className="ui-tiles__container ui-tiles">
                <div className="ui-tiles__tile">
                    <div className="ui-tiles__tile__icon">
                        <i className="fas fa-user" />
                    </div>
                    <div className="ui-tiles__tile__label">
                        Users
                    </div>
                </div>
                <div className="ui-tiles__tile">
                    <div className="ui-tiles__tile__icon">
                        <i className="fas fa-address-book" />
                    </div>
                    <div className="ui-tiles__tile__label">
                        Address Book
                    </div>
                </div>
            </div>
        </div>
        <CodeHighlight>
            {sampleInline}
        </CodeHighlight>
        <hr className="ui-divider" />
        <h3>Small size</h3>
        <div>
            This is a group of tiles with small size. Use `ui-tiles__container` and `ui-tiles--small` together:
            <div className="ui-tiles__container ui-tiles--small">
                <div className="ui-tiles__tile">
                    <div className="ui-tiles__tile__icon">
                        <i className="fas fa-user" />
                    </div>
                    <div className="ui-tiles__tile__label">
                        Users
                    </div>
                </div>
                <div className="ui-tiles__tile">
                    <div className="ui-tiles__tile__icon">
                        <i className="fas fa-address-book" />
                    </div>
                    <div className="ui-tiles__tile__label">
                        Address Book
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
}