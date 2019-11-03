import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { InlineLoader, FullSectionLoader } from 'components/ui/Loader';
import { Block, RowBlock, ColumnBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Button } from 'components/ui/Button';

const sampleInline = `This loader <InlineLoader /> is rendered inline.`;

const sampleFullSection = `<div style={{ width: '100%', height: '300px' }}>
    <FullSectionLoader />
</div>
`;

const sampleLoaders = `import { InlineLoader, FullSectionLoader } from 'components/ui/Loader';

<InlineLoader />

<FullSectionLoader />
`;

const buttonLoader = `<Button disabled={true}>Loading <InlineLoader /></Button>`;


export function ShowCaseLoaders () {
    return <Fragment>
        <Section title="Loaders">
            <Block title="Showcase" isOutstanding={true}>
                <div>
                    Inline
                </div>
                <RowBlock>
                    <ColumnBlock>
                        This loader <InlineLoader /> is rendered inline.
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{sampleInline}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
                <div>
                    Full Section
                </div>
                <RowBlock>
                    <ColumnBlock>
                        <div style={{ width: '100%', height: '300px' }}>
                            <FullSectionLoader />
                        </div>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{sampleFullSection}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Component usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlock>
                        <p>
                            Two loaders are available:
                            <ul>
                                <li>Inline</li>
                                <li>Full section</li>
                            </ul>
                            The inline loader can be used between or inside other elements,
                            while the full section can be used as a page or section loader.
                        </p>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight>{sampleLoaders}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>

            <Block title="Examples">
                <RowBlock>
                    <ColumnBlock>
                        The inline loader can be used inside buttons as well:
                        <div>
                            <Button disabled={true}>Loading <InlineLoader /></Button>
                        </div>
                        <div>
                            <Button classes={['small', 'primary']}>Loading <InlineLoader /></Button>
                        </div>
                    </ColumnBlock>
                    <ColumnBlock>
                        <CodeHighlight language="xml">{buttonLoader}</CodeHighlight>
                    </ColumnBlock>
                </RowBlock>
            </Block>
        </Section>
    </Fragment>;
}