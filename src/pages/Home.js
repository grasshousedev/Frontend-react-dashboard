import React from 'react';
import { Lorem } from 'components/ui/Lorem';

export function Home() {
    return <div className="ui-page__body">
        <h1>Dashboard Home</h1>
        <div>Welcome to my Dashboard.</div>

        <Lorem paragraphs={3} />
    </div>;
}