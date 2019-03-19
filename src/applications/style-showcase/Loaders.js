import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { InlineLoader, FullSectionLoader } from 'components/ui/Loader';

const sampleInline = ` // Call the loader inside a sentence
<div>
    This is a loader that is rendered between two sentences. 
    <FullSectionLoader />
    Should work well!
</div>
`;

const sampleFullSection = `// Call the loader inside a container
<div style={{ width: '100%', height: '300px' }}>
    <FullSectionLoader />
</div>
`;

export function Loaders () {    
    return <Fragment>
        <h2>Loaders</h2>
        <h3>Inline</h3>
        <div>
            This is a loader that is rendered between two sentences. 
            <InlineLoader />
            Should work well!
        </div>
        <CodeHighlight>
            {sampleInline}
        </CodeHighlight>
        <hr className="ui-divider" />
        <h3>Full section</h3>
        <div style={{ width: '100%', height: '300px' }}>
            <FullSectionLoader />
        </div>
        <CodeHighlight>
            {sampleFullSection}
        </CodeHighlight>
    </Fragment>;
}