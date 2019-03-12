import React from 'react';
import { Tabs } from 'components/ui/Tabs';

import { Headers } from './Headers';
import { Sections } from './Sections';

export function Typography() {
    const tabs = [
        { label: 'Headers', content: <Headers /> },
        { label: 'Sections', content: <Sections /> },
    ];

    return <div className="ui-section">
        <Tabs tabs={tabs} />
    </div>;
}
