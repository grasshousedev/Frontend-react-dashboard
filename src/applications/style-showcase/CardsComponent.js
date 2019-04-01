import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { Card } from 'components/ui/Cards';

const componentCard = `<Card
    colors={{ side: "#1280bf", icon: "#1280bf" }}
    width='450px'
    icon={<i className="fas fa-star fa-3x" />}
    title="Star card"
    subtitle="fa-star icon"
    description={<div>Every time I try to type 'star' I actually type 'start'!</div>}
    controls={
        <Fragment>
            <div>
                Tertiary action
            </div>
            <div>
                <button className="ui-button ui-button--small">Secondary</button>
                <button className="ui-button ui-button--small ui-button--positive">Click me</button>
            </div>
        </Fragment>
    }
/>`;

const cssCard = `<div className="ui-card__container">
    <div className="ui-card__side__container">
        <div className="ui-card__side__icon">
            <i className="fas fa-user fa-3x" />
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

export function CardsComponent () {    
    return <Fragment>
        <h2>Cards</h2>
        <h3>Card component</h3>
        The `Card` component can be used to obtain the same effect.
        <div className="ui-text">
            <Card
                colors={{ side: "#1280bf", icon: "#1280bf" }}
                width='450px'
                icon={<i className="fas fa-star fa-3x" />}
                title="Star card"
                subtitle="fa-star icon"
                description={<div>Every time I try to type `star` I actually type `start`!</div>}
                controls={
                    <Fragment>
                        <div>
                            Tertiary action
                        </div>
                        <div>
                            <button className="ui-button ui-button--small">Secondary</button>
                            <button className="ui-button ui-button--small ui-button--positive">Click me</button>
                        </div>
                    </Fragment>
                }
            />   
            <Card
                colors={{ side: "#147b63" }}
                width='450px'
                icon={<i className="fas fa-user fa-3x" />}
                title="This is a Component Card"
                subtitle="Created by using a component"
                description={<div>You can create cards by using a card component... Simple!</div>}
                controls={
                    <Fragment>
                        <div>
                            Tertiary action
                        </div>
                        <div>
                            <button className="ui-button ui-button--small">Secondary</button>
                            <button className="ui-button ui-button--small ui-button--positive">Click me</button>
                        </div>
                    </Fragment>
                }
            />   
            <Card
                colors={{ side: "#e7368f" }}
                styles={{ container: { width: '450px', height: '200px' } }}
                icon={<i className="fas fa-edit fa-3x" />}
                title="Another Component Card"
                subtitle="Created by using a component but without a description"
                controls={
                    <Fragment>
                        <div>
                            Tertiary action
                        </div>
                        <div>
                            <button className="ui-button ui-button--small">Secondary</button>
                            <button className="ui-button ui-button--small ui-button--positive">Click me</button>
                        </div>
                    </Fragment>
                }
            />   
            <Card
                colors={{ side: "#690cb0" }}
                width='450px'
                icon={<i className="fas fa-times fa-3x" />}
                title="This is a Component Card"
                subtitle="Without controls"
                description={<div>This card has no controls, so you can add more text and a longer description</div>}
            />   
        </div>
        <CodeHighlight language="javascript">
            {componentCard}
        </CodeHighlight>
        <hr className="ui-divider" />
        <h3>CSS classes</h3>
        <div>
            This is a group of tiles with standard size:
            <div className="ui-text">
                <div className="ui-card__container">
                    <div className="ui-card__side__container">
                        <div className="ui-card__side__icon">
                            <i className="fas fa-user fa-3x" />
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
            </div>
        </div>
        <CodeHighlight>
            {cssCard}
        </CodeHighlight>
        Another variant can be done with background colors on the side, result is better!
        <div className="ui-text">
            <div className="ui-card__container">
                <div className="ui-card__side__container background-teal">
                    <div className="ui-card__side__icon teal">
                        <i className="fas fa-user fa-3x" />
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
        </div>
    </Fragment>;
}