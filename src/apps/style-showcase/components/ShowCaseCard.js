import React, { Fragment } from 'react';

import { CodeHighlight } from 'components/style/CodeHighlight';
import { Card } from 'components/ui/Cards';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Button } from 'components/ui/Button';
import { Icon } from 'components/ui/Icon';
import { Monospace } from 'components/ui/Text';

import { PropsTable } from '../common/PropsTable';

const showcaseSampleCard = `<Card
    colors={{ side: "#1280bf", icon: "#1280bf" }}
    width='450px'
    icon={<Icon name="person" size="big" />}
    title="This is a Component Card"
    subtitle="Created by using a component"
    description={
        <div>You can create cards by using a card component!</div>
    }
    controls={
        <Fragment>
            <div>
                Tertiary action
            </div>
            <div>
                <Button classes="small">Secondary</Button>
                <Button
                    classes={["small", "positive"]}
                    onClick={() => window.alert('Clicked')}
                >Click me</Button>
            </div>
        </Fragment>
    }
/>`;


const componentNoControlsCard = `<Card
    colors={{ side: "#690cb0" }}
    width='450px'
    icon={<Icon name="person" size="big" />}
    title="This is a Component Card"
    subtitle="Without controls"
    description={<div>
        This card has no controls, so you can add
        more text and a longer description
    </div>}
/>`;

const cssCard = `<div className="ui-card__container">
    <div className="ui-card__side__container">
        <div className="ui-card__side__icon">
            <Icon name="person" size="big" />
        </div>
    </div>
    <div className="ui-card__main__container">
        <div className="ui-card__main">
            <div className="ui-card__title">
                This is the card title
            </div>
            <div className="ui-card__subtitle">
                Subtitle
            </div>
            <div className="ui-card__description">
                Description of the card, ideally a not-so-long text, but with some information!
            </div>
        </div>
        <div className="ui-card__controls">
            <div>
                Tertiary action
            </div>
            <div>
                <button className="ui-button ui-button--small">Secondary</button>
                <button className="ui-button ui-button--small ui-button--positive">Click me</button>
            </div>
        </div>
    </div>
</div>
`;

export function ShowCaseCard () {
    return <Fragment>
        <Section title="Cards">
            <Block title="Showcase" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <Block isContentCentered={true}>
                            <Card
                                colors={{ side: "#1280bf", icon: "#1280bf" }}
                                width='450px'
                                icon={<Icon name="person" size="big" />}
                                title="This is a Component Card"
                                subtitle="Created by using a component"
                                description={<div>You can create cards by using <Monospace>Card</Monospace> component!</div>}
                                controls={
                                    <Fragment>
                                        <div>
                                            Tertiary action
                                        </div>
                                        <div>
                                            <Button classes="small">Secondary</Button>
                                            <Button classes={["small", "positive"]} onClick={() => window.alert('Clicked')}>Click me</Button>
                                        </div>
                                    </Fragment>
                                }
                            />
                        </Block>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{showcaseSampleCard}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>

            </Block>
        </Section>

        <Section title="Class">
            <Block title="Class usage" isOutstanding={true}>
                <p>
                    To create a Card with plain HTML and CSS, we need to create a container
                    for the whole card, one for the side (where the image or color is) and one
                    for the main section.
                    Each of them includes different parts.
                </p>
                <RowBlock>
                    <ColumnBlock>
                        <Block isContentCentered={true}>
                            <div className="ui-card__container">
                                <div className="ui-card__side__container">
                                    <div className="ui-card__side__icon">
                                        <Icon name="person" size="big" />
                                    </div>
                                </div>
                                <div className="ui-card__main__container">
                                    <div className="ui-card__main">
                                        <div className="ui-card__title">
                                            This is the card title
                                        </div>
                                        <div className="ui-card__subtitle">
                                            Subtitle
                                        </div>
                                        <div className="ui-card__description">
                                            Description of the card, ideally a not-so-long text, but with some information!
                                        </div>
                                    </div>
                                    <div className="ui-card__controls">
                                        <div>
                                            Tertiary action
                                        </div>
                                        <div>
                                            <button className="ui-button ui-button--small">Secondary</button>
                                            <button className="ui-button ui-button--small ui-button--positive">Click me</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Block>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{cssCard}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
            <Block>
                <p>
                    The main container includes the following parts:
                    <ul>
                        <li>title</li>
                        <li>subtitle</li>
                        <li>description</li>
                        <li>control</li>
                    </ul>

                    The following parts can be included in the side container:
                    <ul>
                        <li>icon</li>
                    </ul>
                </p>
                <p>
                    Note: the <Monospace>control</Monospace> section will align item at sides,
                    so you need to wrap them together if you want to see them on the same side.
                </p>
            </Block>
        </Section>


        <Section title="Component">

            <Block title="Component usage" isOutstanding={true}>
                <p>
                    The easies way to create a Card is by using the <Monospace>Dropdown</Monospace> component.
                </p>
                <RowBlock>
                    <ColumnBlock>
                        <Block isContentCentered={true}>
                            <Card
                                colors={{ side: "#690cb0" }}
                                width='450px'
                                icon={<Icon name="person" size="big" />}
                                title="This is a Component Card"
                                subtitle="Without controls"
                                description={<div>This card has no controls, so you can add more text and a longer description</div>}
                            />
                        </Block>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{componentNoControlsCard}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Props />
        </Section>

    </Fragment>;
}


function Props() {
    return <PropsTable title="Props" propsList={[
        {
            propName: 'title',
            propType: 'node',
            description: <div>
                The title of the card. This is displayed in the main section.
            </div>
        },
        {
            propName: 'subtitle',
            propType: 'node',
            description: <div>
                The subtitle of the card. This is displayed in the main section, under the title.
            </div>
        },
        {
            propName: 'description',
            propType: 'node',
            description: <div>
                The content of the card, displayed in the main section under title and subtitle.
            </div>
        },
        {
            propName: 'controls',
            propType: 'node',
            description: <div>
                One or more elements shown under the description. The controls container has a
                <Monospace>flex</Monospace> display with
                <Monospace>space-between</Monospace> justify content.
                This means that in order to see two buttons on the same side you need to wrap them
                inside a container.
            </div>
        },
        {
            propName: 'width',
            propType: 'string',
            description: <div>
                Width of the container. If set, will be added to the container&#39;s style.
            </div>
        },
        {
            propName: 'colors',
            propType: 'object',
            description: <div>
                This property allows to quickly set the colors of the side part and the icon.
                The object can have these two properties:
                <ul>
                    <li><Monospace>side</Monospace></li>
                    <li><Monospace>icon</Monospace></li>
                </ul>
                Both colors are added to the relative element&#39;style.
            </div>
        },
        {
            propName: 'styles',
            propType: 'object',
            description: <div>
                With this property you can control the style of the elements directly.
                The object can have these properties, each related to a different part:
                <ul>
                    <li><Monospace>container</Monospace></li>
                    <li><Monospace>side</Monospace></li>
                    <li><Monospace>icon</Monospace></li>
                    <li><Monospace>controls</Monospace></li>
                </ul>
            </div>
        },
        {
            propName: 'onClick',
            propType: 'function',
            description: <div>
                Function called when the container is clicked.
            </div>
        },
    ]} />;
}
