import React, { Fragment, useState } from 'react';
import { Grid } from 'components/grid/Grid';
import { CodeHighlight } from 'components/style/CodeHighlight';

const rows = [];
for (let i=0; i<1000; i++) {
    rows.push({
        id: i,
        test1: `Test field test1 for row ${i}`,
        test2: `Test field test2`,
        test3: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus. Vivamus bibendum id lacus sit amet faucibus. Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa. Nullam aliquet velit eget metus placerat tempus.`,
        test4: `Short column for row ${i}`,
        test5: `Mid col row ${i}`,
        test6: `Test field test2`,
        test7: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus. Vivamus bibendum id lacus sit amet faucibus. Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa. Nullam aliquet velit eget metus placerat tempus.`,
        test8: `Short column for row ${i}`,
    });
}

const pinColumn = function(column, pin, pinned) {
    if (pin) {
        return [...pinned, column];
    } else {
        return pinned.filter(c => c !== column);
    }
};

export function GridComponent() {
    const [showControls, setShowControls] = useState(true);
    const [zebra, setZebra] = useState(true);
    const [rowBorder, setRowBorder] = useState(true);
    const [sectionBorder, setSectionBorder] = useState(true);
    const [pinnedLeft, setPinnedLeft] = useState(['id']);
    const [pinnedRight, setPinnedRight] = useState([]);
    const [width, setWidth] = useState();
    const [height, setHeight] = useState(300);

    const columns = ['id', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8'];
    const columnsLabel = { id: 'ID', test1: 'Test 1', test2: 'Test 2', test3: 'Test 3', test4: 'Test 4', test5: 'Test 5' };

    const gridOptions = {
        columns, columnsLabel,
        columnsWidth: { id: 40, test7: 400 },
        width, height,
        pinnedColumns: { left: pinnedLeft, right: pinnedRight },
        styles: { zebra, rowBorder, sectionBorder },
    };

    return <div>
        <div className="ui-section">
            <button className={`button button--small`} onClick={() => setShowControls(!showControls) }>Toggle show Controls</button>
        </div>
        {showControls && <Fragment>            
            <div className="ui-section"> 
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Sizes</h2>
                    <div className="ui-section ui-form__container">
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Width</div>
                            <div className="ui-form__input">
                                <input value={width || ''} onChange={e => setWidth(e.target.value ? +e.target.value : undefined)} />
                            </div>
                        </div>
                        <div className="ui-form__field">
                            <div className="ui-form__label w-100">Height</div>
                            <div className="ui-form__input"><input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} /></div>
                        </div>
                    </div>
                    <h2 className="ui-title">Styles</h2>
                    <div className="ui-section">
                        <button className={`button button--small ${zebra ? 'button--positive' : ''}`} onClick={() => setZebra(!zebra) }>Zebra</button>
                        <button className={`button button--small ${rowBorder ? 'button--positive' : ''}`} onClick={() => setRowBorder(!rowBorder) }>Row Border</button>
                        <button className={`button button--small ${sectionBorder ? 'button--positive' : ''}`} onClick={() => setSectionBorder(!sectionBorder) }>Section Border</button>
                    </div>
                </div>
                <div className="ui-section__column w-50pc">
                    <h2 className="ui-title">Pinned Columns</h2>
                    <div className="ui-section">
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Left</h4>
                            {columns.map(column => {
                                return <div key={`pinned-left-${column}`}>
                                    <input
                                        type="checkbox" id={`pin-column-left-${column}`}
                                        onChange={e => setPinnedLeft(pinColumn(column, e.target.checked, pinnedLeft))} checked={pinnedLeft.includes(column)} />
                                    <label htmlFor={`pin-column-left-${column}`}>{columnsLabel[column] ? columnsLabel[column] : column}</label>
                                </div>;
                            })}                    
                        </div>
                        <div className="ui-section__column w-50pc">
                            <h4 className="ui-title ui-section__title">Right</h4>
                            {columns.map(column => {
                                return <div key={`pinned-right-${column}`}>
                                    <input
                                        type="checkbox" id={`pin-column-right-${column}`}
                                        onChange={e => setPinnedRight(pinColumn(column, e.target.checked, pinnedRight))} checked={pinnedRight.includes(column)} />
                                    <label htmlFor={`pin-column-right-${column}`}>{columnsLabel[column] ? columnsLabel[column] : column}</label>
                                </div>;
                            })}                    
                        </div>           
                    </div>
                </div>           
            </div>
        </Fragment>}

        <Grid
            {...gridOptions}
            rows={rows}
        />

        <div>
            <h2 className="ui-title">Generated <em>props</em></h2>
            <CodeHighlight>
                {JSON.stringify({ ...gridOptions, rows: [] }, null, 4)}
            </CodeHighlight>
        </div>
    </div>;
}