import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { InlineLoader, FullSectionLoader } from 'components/ui/Loader';
import { Block, RowBlock } from 'components/ui/Blocks';
import { Section } from 'components/ui/Section';
import { Button } from 'components/ui/Button';
import { ColumnBlockCodeSplit } from '../common/ColumnBlockCodeSplit';


export function ShowCaseLoaders () {
    return <Fragment>
        <Section title="Loaders">
            <Block title="Showcase" isOutstanding={true}>
                <div>
                    Inline
                </div>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        This loader <InlineLoader /> is rendered inline.
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{sampleInline}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
                <div>
                    Full Section
                </div>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <div style={{ width: '100%', height: '300px' }}>
                            <FullSectionLoader />
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{sampleFullSection}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>

        <Section title="Component">
            <Block title="Component usage" isOutstanding={true}>
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        <p>
                            Two loaders are available:
                            <ul>
                                <li>Inline</li>
                                <li>Full section</li>
                            </ul>
                            The inline loader can be used between or inside other elements,
                            while the full section can be used as a page or section loader.
                        </p>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight>{sampleLoaders}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>

            <Block title="Examples">
                <RowBlock>
                    <ColumnBlockCodeSplit>
                        The inline loader can be used inside buttons as well:
                        <div>
                            <Button disabled={true}>Loading <InlineLoader /></Button>
                        </div>
                        <div>
                            <Button classes={['small', 'primary']}>Loading <InlineLoader /></Button>
                        </div>
                    </ColumnBlockCodeSplit>
                    <ColumnBlockCodeSplit>
                        <CodeHighlight language="xml">{buttonLoader}</CodeHighlight>
                    </ColumnBlockCodeSplit>
                </RowBlock>
            </Block>
        </Section>
    </Fragment>;
}


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
