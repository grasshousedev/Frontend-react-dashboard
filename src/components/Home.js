import React from 'react';
import { Lorem } from 'components/ui/Lorem';

export function Home() {
    return <div className="dashboard-ui__page-body__container">
        <h1>Dashboard Home</h1>
        <div>Welcome to my Dashboard.</div>

        <Lorem paragraphs={3} />
    </div>;
}