import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Icon } from 'components/ui/Icon';
import { Section } from 'components/ui/Section';
import { Tiles } from 'components/ui/Tiles';
import { Monospace } from 'components/ui/Text';

import { PropsTable } from '../common/PropsTable';


const showcaseTiles = `<Tiles.Container>
    <Tiles.Tile
        onClick={() => window.alert('User clicked')}
        icon={<Icon name="person" />}
        label="Users"
    />
    <Tiles.Tile
        onClick={() => window.alert('Address book clicked')}
        icon={<Icon name="menu_book" />}
        label="Address Book"
    />
</Tiles.Container>`;

const showcaseTilesSmall = `<Tiles.Container small={true}>
    <Tiles.Tile
        onClick={() => window.alert('User clicked')}
        icon={<Icon name="person" />}
        label="Users"
    />
    <Tiles.Tile
        onClick={() => window.alert('Address book clicked')}
        icon={<Icon name="menu_book" />}
        label="Address Book"
    />
</Tiles.Container>`;

const tileCss = `<div className="ui-tiles__container">
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
            <i className="fas fa-menu_book" />
        </div>
        <div className="ui-tiles__tile__label">
            Address Book
        </div>
    </div>
</div>
`;

const tileComponent = `import { Tiles } from 'components/ui/Tiles';

<Tiles.Container small={true}>
    <Tiles.Tile
        onClick={() => window.alert('User 1')}
        icon={<Icon name="person" />}
        label="User 1"
    />
    <Tiles.Tile
        onClick={() => window.alert('User 2')}
        icon={<Icon name="person" />}
        label="User 2"
    />
    <Tiles.Tile
        onClick={() => window.alert('User 3')}
        icon={<Icon name="person" />}
        label="User 3"
    />
</Tiles.Container>`;

export function ShowCaseTiles () {
    return <Fragment>
        <Section title="Tiles">
            <Block title="Showcase" isOutstanding={true}>
                <div>
                    <h3>Standard Tiles</h3>
                </div>
                <RowBlock>
                    <ColumnBlock>
                        <Tiles.Container>
                            <Tiles.Tile
                                onClick={() => window.alert('User clicked')}
                                icon={<Icon name="person" />}
                                label="Users"
                            />
                            <Tiles.Tile
                                onClick={() => window.alert('Address book clicked')}
                                icon={<Icon name="person" />}
                                label="Address Book"
                            />
                        </Tiles.Container>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{showcaseTiles}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
                <div>
                    <h3>Small Tiles</h3>
                </div>
                <RowBlock>
                    <ColumnBlock>

                        <Tiles.Container small={true}>
                            <Tiles.Tile
                                onClick={() => window.alert('User clicked')}
                                icon={<Icon name="person" />}
                                label="Users"
                            />
                            <Tiles.Tile
                                onClick={() => window.alert('Address book clicked')}
                                icon={<Icon name="menu_book" />}
                                label="Address Book"
                            />
                        </Tiles.Container>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{showcaseTilesSmall}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Class">
            <Block title="Class usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <p>
                            Tiles are a set of icon/label pairs grouped inside a flexible container.
                        </p>
                        <p>
                            A container must be defined with class <Monospace>ui-tiles__container</Monospace>.
                            To make the tiles smaller, add to the container the class
                            <Monospace>ui-tiles--small</Monospace>
                            (note: this class is not BEM compliant as it overrides tile and icon).
                        </p>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{tileCss}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Component usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <p>
                            Like with CSS, a container must be created before using tiles.
                            <Monospace>Tiles</Monospace> object can be imported, which has
                            <Monospace>Container</Monospace> and <Monospace>Tile</Monospace> properties
                            as components.
                        </p>
                        <Block>
                            <Tiles.Container small={true}>
                                <Tiles.Tile
                                    onClick={() => window.alert('User 1')}
                                    icon={<Icon name="person" />}
                                    label="User 1"
                                />
                                <Tiles.Tile
                                    onClick={() => window.alert('User 2')}
                                    icon={<Icon name="person" />}
                                    label="User 2"
                                />
                                <Tiles.Tile
                                    onClick={() => window.alert('User 3')}
                                    icon={<Icon name="person" />}
                                    label="User 3"
                                />
                            </Tiles.Container>
                        </Block>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="javascript">{tileComponent}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <ContainerProps />
        <TileProps />

    </Fragment>;
}

function ContainerProps() {
    return <PropsTable title="Container Props"
        propsList={[
            {
                propName: 'children',
                propType: 'node',
                description: <div>
                    The list of tiles (usually <Monospace>Tiles.Tile</Monospace> components).
                </div>
            },
            {
                propName: 'small',
                propType: 'boolean',
                default: 'false',
                description: <div>
                    Apply small modifiers to render small tiles.
                </div>
            },
            {
                propName: 'rest',
                propType: 'spread',
                description: <div>
                    Extra props are supported and applied to the container element.
                </div>
            },
        ]}
    />;
}

function TileProps() {
    return <PropsTable title="Tile Props"
        propsList={[
            {
                propName: 'icon',
                propType: 'node',
                isRequired: true,
                description: <div>
                    The icon to render.
                </div>
            },
            {
                propName: 'label',
                propType: 'node',
                isRequired: true,
                description: <div>
                    Tile&#39;s label.
                </div>
            },
            {
                propName: 'rest',
                propType: 'spread',
                description: <div>
                    Extra props are supported and applied to the tile element.
                </div>
            },
        ]}
    />;
}