import React from 'react';
import { Timeline } from 'components/ui/Timeline';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';

const events = [
    { title: '12-Dec-2019', content: <Lorem /> },
    { title: '01-Jan-2020', content: <Lorem paragraphs={3} /> },
    { title: '08-Feb-2020', content: <Lorem paragraphs={1} />, description: 'This is a description below the date' },
    { title: '27-Jul-2021', content: <Lorem /> },
];

const sample = `// declare a list of objects
const events = [
    { title: '12-Dec-2019', content: <Lorem /> },
    { title: '01-Jan-2020', content: <Lorem paragraphs={3} /> },
    { title: '08-Feb-2020', content: <Lorem paragraphs={1} />, description: 'This is a description below the date' },
    { title: '27-Jul-2021', content: <Lorem /> },
];
// then
<Timeline events={events} />
`;

export function TimelineComponent() {
    return <div>
        <Timeline events={events} />
        <CodeHighlight>{sample}</CodeHighlight>
    </div>;
}