import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { FullSectionLoader } from 'components/ui/Loader';

const sample = `// Call the loader inside a container
<div style={{ width: '100%', height: '300px' }}>
    <FullSectionLoader />
</div>
`;


export function Loaders () {    
    return <Fragment>
        <h2>Loaders</h2>
        <h3>Full section</h3>
        <div style={{ width: '100%', height: '300px' }}>
            <FullSectionLoader />
        </div>
        <CodeHighlight>
            {sample}
        </CodeHighlight>
    </Fragment>;
}