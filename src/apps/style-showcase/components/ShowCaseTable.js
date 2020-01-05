import React, { Fragment, useState } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Table } from 'components/ui/table/Table';
import { Monospace } from 'components/ui/Text';
import { Checkbox, Form, HField, Input, Select, Toggle } from 'components/ui/form';

import { PropsTable } from '../common/PropsTable';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';
import { SEARCH_TYPES, SEARCH_FILTER_OPERATORS } from 'components/ui/table/constants';


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
                                        <HField label="Padding">
                                            <Input value={padding || ''} onChange={e => setPadding(e.target.value ? +e.target.value : undefined)} />
                                        </HField>
                                        <HField label="Height">
                                            <Input value={height || ''} onChange={e => setHeight(e.target.value ? +e.target.value : undefined)} />
                                        </HField>
                                    </Form>
                                </Block>
                            </ColumnBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Header</h4>
                                <Form>
                                    <HField label="Header Controller">
                                        <Toggle checked={headerController} onClick={setHeaderController} />
                                    </HField>
                                </Form>

                                <h4>Body</h4>
                                <Form>
                                    <HField label="Zebra">
                                        <Toggle checked={zebra} onClick={setZebra} />
                                    </HField>
                                    <HField label="Border Type">
                                        <Select
                                            value={borderType}
                                            onChange={bt => setBorderType(bt.value || undefined)}
                                            options={BORDER_TYPES}
                                        />
                                    </HField>
                                    <HField label="Vertical Alignment">
                                        <Select
                                            value={verticalAlignment}
                                            onChange={va => setVerticalAlignment(va.value || undefined)}
                                            options={VERTICAL_ALIGNMENTS}
                                        />
                                    </HField>
                                </Form>
                            </ColumnBlock>
                        </RowBlock>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <RowBlock>
                            <ColumnBlock className="col-xs-12 col-sm-6 col-md-6">
                                <h4>Pagination</h4>
                                <Form>
                                    <HField label="Use Pagination">
                                        <Toggle checked={pagination} onClick={setPagination} />
                                    </HField>
                                    <h4>Page controller</h4>
                                    <HField label="Visible">
                                        <Toggle
                                            checked={pageController.visible}
                                            onClick={checked => setPageController({ ...pageController, visible: checked })}
                                        />
                                    </HField>
                                    <HField label="Style">
                                        <Select
                                            value={pageController.style}
                                            onChange={pcs => setPageController({ ...pageController, style: pcs.value })}
                                            options={PAGE_CONTROLLER_STYLES}
                                        />
                                    </HField>
                                </Form>
                                <h4>Other</h4>
                                <Form>
                                    <HField label="Single Line">
                                        <Toggle checked={singleLine} onClick={setSingleLine} />
                                    </HField>
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
        <PropsFilters />
        <SearchDoc />
    </Fragment>;
}

function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'columns',
            propType: 'array',
            isRequired: true,
            description: 'A list of columns defintion. Each defintion is an object with the following properties: prop, title, width and search (see Search below).'
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
            description: 'An object with the properties described in the table below. See "Config" below.'
        },
        {
            propName: 'filters',
            propType: 'object',
            isRequired: false,
            description: 'Filters configuration. See "Filters" below.'
        },
    ]} />;
}

function PropsFilters() {
    return <PropsTable title="Filters" propsList={[
        {
            propName: 'initial',
            propType: 'array',
            description: <div>
                A list of filters. Each filter is an object configured with the following keys:
                <ul>
                    <li><Monospace>field</Monospace>: the field that will be filtered</li>
                    <li><Monospace>operator</Monospace>: a valid operator for the field type</li>
                    <li><Monospace>value</Monospace>: the value that will be used as a filter</li>
                </ul>
                Depending on how fields are configured, different operators are available.
                See {'"Operators"'} section in the Search below.
            </div>
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
                    <li><Monospace>none</Monospace></li>
                    <li><Monospace>row</Monospace></li>
                    <li><Monospace>cell</Monospace></li>
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
                    <li><Monospace>top</Monospace></li>
                    <li><Monospace>middle</Monospace></li>
                    <li><Monospace>bottom</Monospace></li>
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
            default: '{ visible: true, style: "collapsed" }',
            description: <div>
                An object with the following properties:
                <ul>
                    <li><Monospace>visible</Monospace>: shows page controller (under the table)</li>
                    <li>
                        <Monospace>style</Monospace>: can be `collapsed` (all aligned to the right)
                        or `expanded` (spread over all the width)
                    </li>
                </ul>
            </div>
        },
        {
            propName: 'hideHeader',
            propType: 'bool',
            description: <div>
                Hide the header of the table.
            </div>
        },
    ]} />;
}

function SearchDoc() {
    return <Block title="Search">
        <p>
            It is possible to enable a Search Bar inside the Tool Bar (above the table).
            <br />
            The Search Bar will create three controllers that will allow to select a field,
            an operator related to the field and to set a value.
            The first two are <Monospace>select</Monospace>, the third is an <Monospace>input</Monospace>.
        </p>

        <h3>Fields</h3>
        <div>
            The list of fields is generated from the main <Monospace>columns</Monospace> prop.
            Each field is added by default with a <Monospace>string</Monospace> type.
            It is possible to pass a <Monospace>search</Monospace> configuration to the column.
            This object can have the following properties:
            <ul>
                <li>
                    <Monospace>exclude</Monospace>: set to <Monospace>true</Monospace>
                    if the field has to be excluded from the searchable fields
                </li>
                <li><Monospace>title</Monospace>: specify a title if different from the column title.</li>
                <li>
                    <Monospace>type</Monospace>: specify the {"field's"} value type.
                    Valid types are:
                    <ul>
                        {Object.values(SEARCH_TYPES).map(t => <li key={t}><Monospace>{t}</Monospace></li>)}
                    </ul>
                </li>
            </ul>
        </div>

        <h3>Operators</h3>
        Operators are set based on the field type.
        <div className="p-15">
            {Object.values(SEARCH_TYPES).map(st => {
                return <Fragment key={st}>
                    <h4>{st}</h4>
                    <ul>
                        {SEARCH_FILTER_OPERATORS[st].map(sfo => {
                            return <li key={sfo.value}><Monospace>{sfo.value}</Monospace></li>;
                        })}
                    </ul>
                </Fragment>;
            })}
        </div>

        <h3>Values</h3>
        <div>
            Each value should be the same type of value that an entry has.
            Currently, reference keys are not supported but will be added soon (i.e. a select with values).
        </div>

        <h2>Custom values for entries</h2>
        <div>
            The value is filtered agains the <Monospace>entry</Monospace> value.
            However, if this is a JSX value or a complex one, it might not be filtered properly.
            <br />
            To use a different value for a field, it is possible to decorate the single entry with an
            <Monospace>_entry</Monospace> object field, which defines the fields value.
            <CodeHighlight language="json">{JSON.stringify(searchEntrySample, null, 4)}</CodeHighlight>
        </div>
        T

    </Block>;
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

const searchEntrySample = [
    { id: 1, title: '<h4>Title 1</h4>', _entry: { title: 'Title 1' } },
    { id: 2, title: '<h4>Title 2</h4>', _entry: { title: 'Title 2' } },
];
