import React, { Fragment } from 'react';
import { CodeHighlight } from 'components/style/CodeHighlight';
import { Panel } from 'components/ui/Panel';
import { Lorem } from 'components/ui/Lorem';

const sample = `// Usage
<Panel><Lorem paragraphs={3} /></Panel>
`;

export function Panels() {
    return <Fragment>
        <h2>Panels</h2>
        <Panel><Lorem paragraphs={3} /></Panel>
        <CodeHighlight>
            {sample}
        </CodeHighlight>
    </Fragment>;
}
