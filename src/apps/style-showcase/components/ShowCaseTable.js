import React, { Fragment, useState } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Table } from 'components/ui/table/Table';
import { Form, Field } from 'components/ui/form/Form';

import { PropsTable } from '../common/PropsTable';
import { Input } from 'components/ui/form/Input';
import { Select } from 'components/ui/form/Select';
import { Toggle } from 'components/ui/form/Toggle';
import { Checkbox } from 'components/ui/form/Checkbox';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';

const SAMPLE_ENTRIES = getEntries();

const SAMPLE_COLUMNS = [
    { prop: 'id', title: 'ID', width: 80},
    { prop: 'test1', title: 'Test 1', width: 200 },
    { prop: 'test2', title: 'Test 2', width: 150 },
    { prop: 'test3', title: 'Test 3', width: 500 },
    { prop: 'test4', title: 'Test 4', width: 170 },
    { prop: 'test5', title: 'Test 5', width: 100 },
    { prop: 'test6', title: 'Test 6', width: 100 },
];

const BORDER_TYPES = [
    { value: 'none', label: 'None' },
    { value: 'row', label: 'Row' },
    { value: 'cell', label: 'Cell' },
];

const VERTICAL_ALIGNMENTS = [
    { value: '', label: 'None' },
    { value: 'top', label: 'Top' },
    { value: 'middle', label: 'Middle' },
    { value: 'bottom', label: 'Bottom' },
];

const PAGE_CONTROLLER_STYLES = [
    { value: 'collapsed', label: 'Collapsed' },
    { value: 'expanded', label: 'Expanded' },
];


export function ShowCaseTable() {
    const [singleLine, setSingleLine] = useState(true);
    const [padding, setPadding] = useState(9);
    const [borderType, setBorderType] = useState('row');
    const [height, setHeight] = useState(200);
    const [pinnedLeft, setPinnedLeft] = useState(['id', 'test1']);
    const [zebra, setZebra] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [pageController, setPageController] = useState({ visible: true, style: 'collapsed' });
    const [headerController, setHeaderController] = useState(true);
    const [verticalAlignment, setVerticalAlignment] = useState('top');

    const config = {
        singleLine,
        padding,
        borderType,
        height,
        pinnedLeft,
        zebra,
        headerController,
        pagination,
        pageController,
        verticalAlignment
    };

    return <Fragment>
        <Section title="Table">
            <Block title="Showcase" isOutstanding={true}>
                <p>
                    This is a sample table, with pinned columns and pagination.
                    You can change the generated config via the configurator below the table.
                </p>
                <Block>
                    <Table
                        columns={SAMPLE_COLUMNS}
                        entries={SAMPLE_ENTRIES}
                        config={config}
                    />
                </Block>
            </Block>

            <Block title="Configurator">
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <RowBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Spacing and size</h4>
                                <Block>
                                    <Form>
                                        <Field label="Padding">
                                            <Input value={padding || ''} onChange={e => setPadding(e.target.value ? +e.target.value : undefined)} />
                                        </Field>
                                        <Field label="Height">
                                            <Input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} />
                                        </Field>
                                    </Form>
                                </Block>
                            </ColumnBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Header</h4>
                                <Form>
                                    <Field label="Header Controller">
                                        <Toggle checked={headerController} onClick={setHeaderController} />
                                    </Field>
                                </Form>

                                <h4>Body</h4>
                                <Form>
                                    <Field label="Zebra">
                                        <Toggle checked={zebra} onClick={setZebra} />
                                    </Field>
                                    <Field label="Border Type">
                                        <Select
                                            value={borderType}
                                            onChange={bt => setBorderType(bt.value || undefined)}
                                            options={BORDER_TYPES}
                                        />
                                    </Field>
                                    <Field label="Vertical Alignment">
                                        <Select
                                            value={verticalAlignment}
                                            onChange={va => setVerticalAlignment(va.value || undefined)}
                                            options={VERTICAL_ALIGNMENTS}
                                        />
                                    </Field>
                                </Form>
                            </ColumnBlock>
                        </RowBlock>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <RowBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Pagination</h4>
                                <Form>
                                    <Field label="Use Pagination">
                                        <Toggle checked={pagination} onClick={setPagination} />
                                    </Field>
                                    <h4>Page controller</h4>
                                    <Field label="Visible">
                                        <Toggle
                                            checked={pageController.visible}
                                            onClick={checked => setPageController({ ...pageController, visible: checked })}
                                        />
                                    </Field>
                                    <Field label="Style">
                                        <Select
                                            value={pageController.style}
                                            onChange={pcs => setPageController({ ...pageController, style: pcs.value })}
                                            options={PAGE_CONTROLLER_STYLES}
                                        />
                                    </Field>
                                </Form>
                                <h4>Other</h4>
                                <Form>
                                    <Field label="Single Line">
                                        <Toggle checked={singleLine} onClick={setSingleLine} />
                                    </Field>
                                </Form>
                            </ColumnBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Pinned Columns</h4>
                                <p>
                                    Note: this is the initial list, changes made directly in the table will
                                    be overridden if parameters are changed.
                                </p>
                                <RowBlock>
                                    <ColumnBlock>
                                        <h4>Left</h4>
                                        {SAMPLE_COLUMNS.map(column => {
                                            return <div key={`pinned-left-${column.prop}`}>
                                                <Checkbox id={`pin-column-left-${column.prop}`}
                                                    label={column.title}
                                                    onClick={checked => setPinnedLeft(pinColumn(column.prop, checked, pinnedLeft))}
                                                    checked={pinnedLeft.includes(column.prop)}
                                                />
                                            </div>;
                                        })}
                                    </ColumnBlock>
                                    <ColumnBlock>
                                        <h4>Right</h4>
                                        <p>To be done</p>
                                    </ColumnBlock>
                                </RowBlock>
                            </ColumnBlock>
                        </RowBlock>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Block title="Generated Config">
                <RowBlock>
                    <ColumnBlock>
                        <CodeHighlight>{JSON.stringify(config, null, 4)}</CodeHighlight>
                    </ColumnBlock>
                    <ColumnBlock>
                        <h4>Todo</h4>
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
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Props />
        <PropsConfig />
    </Fragment>;
}

function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'columns',
            propType: 'array',
            isRequired: true,
            description: 'A list of columns defintion. Each defintion is an object with the following properties: prop, title and width.'
        },
        {
            propName: 'entries',
            propType: 'array',
            isRequired: true,
            description: 'A list of objects that will be used to generate the rows.'
        },
        {
            propName: 'config',
            propType: 'array',
            isRequired: false,
            description: 'An object with the properties described in the table below.'
        },
    ]} />;
}

function PropsConfig() {
    return <PropsTable title="config" propsList={[
        {
            propName: 'padding',
            propType: 'number',
            default: 9,
            description: 'Table cell padding, both for header and body.'
        },
        {
            propName: 'singleLine',
            propType: 'boolean',
            default: 'false',
            description: 'If true, will not go on a new line and will use ellipses to truncate the value instead.' +
                'This has to be set to true if using pinned columns.'
        },
        {
            propName: 'borderType',
            propType: 'string',
            default: 'row',
            description: <div>
                Set the border type. Following values are accepted:
                <ul>
                    <li><pre className="ui-text__monospace">none</pre></li>
                    <li><pre className="ui-text__monospace">row</pre></li>
                    <li><pre className="ui-text__monospace">cell</pre></li>
                </ul>
            </div>},
        {
            propName: 'height',
            propType: 'number',
            description: 'Set the height of the table container.'
        },
        {
            propName: 'headerController',
            propType: 'boolean',
            default: 'true',
            description: 'Enable the header controller, which allows to sort or pin columns.'
        },
        {
            propName: 'verticalAligment',
            propType: 'string',
            default: 'middle',
            description: <div>
                Set the vertical alignment of Body cells. Accepted values are:
                <ul>
                    <li><pre className="ui-text__monospace">top</pre></li>
                    <li><pre className="ui-text__monospace">middle</pre></li>
                    <li><pre className="ui-text__monospace">bottom</pre></li>
                </ul>
            </div>
        },
        {
            propName: 'pagination',
            propType: 'boolean',
            default: 'false',
            description: 'Enable pagination.'
        },
        {
            propName: 'pageController',
            propType: 'object',
            description: <div>
                An object with the following properties:
                <ul>
                    <li><pre className="ui-text__monospace">visible</pre>: shows page controller (under the table)</li>
                    <li><pre className="ui-text__monospace">style</pre>: can be `collapsed` (all aligned to the right) or `expanded` (spread over all the width)</li>
                </ul>
            </div>
        },
    ]} />;
}

const pinColumn = function(column, pin, pinned) {
    if (pin) {
        return [...pinned, column];
    } else {
        return pinned.filter(c => c !== column);
    }
};

function getEntries() {
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
    return entries;
}

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
