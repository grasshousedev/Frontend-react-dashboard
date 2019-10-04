import React, { Fragment, useState } from 'react';
import { Table } from 'components/table/Table';
import { CodeHighlight } from 'components/style/CodeHighlight';

const entries = [];
const test2 = ['aaa aaa', 'bbbb bb', 'cc cccc', 'dd d dd'];
for (let i=0; i<50; i++) {
    entries.push({
        id: i,
        test1: `Test field test1 for row ${i}`,
        test2: test2[randomNumber(0, 3)],
        test3: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus. Vivamus bibendum id lacus sit amet faucibus. Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa. Nullam aliquet velit eget metus placerat tempus.`,
        test4: `Short column for row ${i}`,
        test5: `Mid col row ${i}`,
        test6: `Test field test2`,
    });
}

const pinColumn = function(column, pin, pinned) {
    if (pin) {
        return [...pinned, column];
    } else {
        return pinned.filter(c => c !== column);
    }
};

export function TableComponent() {
    const [showControls, setShowControls] = useState(false);
    const [singleLine, setSingleLine] = useState(true);
    const [padding, setPadding] = useState(9);
    const [borderType, setBorderType] = useState('cell');
    const [height, setHeight] = useState(200);
    const [pinnedLeft, setPinnedLeft] = useState(['id', 'test1']);
    const [zebra, setZebra] = useState(true);
    const [pageController, setPageController] = useState({ visible: true, style: 'collapsed' });

    const [width, setWidth] = useState();


    const columns = [
        { prop: 'id', title: 'ID', width: 80},
        { prop: 'test1', title: 'Test 1', width: 200 },
        { prop: 'test2', title: 'Test 2', width: 150 },
        { prop: 'test3', title: 'Test 3', width: 500 },
        { prop: 'test4', title: 'Test 4', width: 170 },
        { prop: 'test5', title: 'Test 5', width: 100 },
        { prop: 'test6', title: 'Test 6', width: 100 },
    ];

    const config = {
        singleLine,
        padding,
        borderType,
        height,
        pinnedLeft,
        zebra,
        pageController
    };

    return <div>
        <div className="ui-section">
            <button className={`ui-button ui-button--small`} onClick={() => setShowControls(!showControls) }>Toggle show Controls</button>
        </div>
        {showControls && <Fragment>
            <div className="ui-section">
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Sizes</h2>
                    <div className="ui-section ui-form__container">
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Width</div>
                            <div className="ui-form__field-input">
                                <input value={width || ''} onChange={e => setWidth(e.target.value ? +e.target.value : undefined)} />
                            </div>
                        </div>
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Height</div>
                            <div className="ui-form__field-input"><input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} /></div>
                        </div>
                    </div>
                    <h2 className="ui-title">Spacing</h2>
                    <div className="ui-section ui-form__container">
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Padding</div>
                            <div className="ui-form__field-input">
                                <input value={padding || ''} onChange={e => setPadding(e.target.value ? +e.target.value : undefined)} />
                            </div>
                        </div>
                    </div>
                    <h2 className="ui-title">Styles</h2>
                    <div className="ui-section">
                        <button className={`ui-button ui-button--small ${zebra ? 'ui-button--positive' : ''}`} onClick={() => setZebra(!zebra) }>Zebra</button>
                        <span>
                            <button className={`ui-button ui-button--small ${pageController.visible ? 'ui-button--positive' : ''}`} onClick={() => setPageController({ ...pageController, visible: !pageController.visible }) }>Show Page Controller</button>
                            Style
                            <select value={pageController.style} onChange={e => setPageController({ ...pageController, style: e.target.value })}>
                                <option value='collapsed'>Collapsed</option>
                                <option value='expanded'>Expanded</option>
                            </select>
                        </span>
                        <button className={`ui-button ui-button--small ${singleLine ? 'ui-button--positive' : ''}`} onClick={() => setSingleLine(!singleLine) }>Single Line</button>
                        <span>
                            Border Type
                            <select value={borderType} onChange={e => setBorderType(e.target.value ? e.target.value : undefined)}>
                                <option value=''>None</option>
                                <option value='row'>Row</option>
                                <option value='cell'>Cell</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Pinned Columns</h2>
                    <div className="ui-section">Note: this is the initial list, changes made directly in the table will be overridden if parameters are changed.</div>
                    <div className="ui-section">
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Left</h4>
                            {columns.map(column => {
                                return <div key={`pinned-left-${column.prop}`}>
                                    <input
                                        type="checkbox" id={`pin-column-left-${column.prop}`}
                                        onChange={e => setPinnedLeft(pinColumn(column.prop, e.target.checked, pinnedLeft))} checked={pinnedLeft.includes(column.prop)} />
                                    <label htmlFor={`pin-column-left-${column.prop}`}>{column.title}</label>
                                </div>;
                            })}
                        </div>
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Right</h4>
                            <b>To be done</b>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>}

        <Table
            columns={columns}
            entries={entries}
            config={config}
        />

        <div className="ui-section">
            <div className="ui-section__column w-50pc">
                <h2 className="ui-title">Generated <em>config</em></h2>
                <CodeHighlight>
                    {JSON.stringify(config, null, 4)}
                </CodeHighlight>
            </div>
            <div className="ui-section__column w-50pc">
                <h2 className="ui-title">Todo</h2>
                <ul>
                    <li><s>Header and Body components</s></li>
                    <li><s>Pinned Left</s></li>
                    <li><s>Zebra style</s></li>
                    <li><s>Pagination</s></li>
                    <li><s>Sort icons on column header</s></li>
                    <li><s>Options icon on column header</s></li>
                    <li>Pinned Right</li>
                    <li>Pinned columns without single line</li>
                </ul>
            </div>
        </div>
    </div>;
}

function randomNumber (min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
