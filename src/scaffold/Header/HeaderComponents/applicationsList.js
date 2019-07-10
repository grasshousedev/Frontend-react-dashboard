import React from 'react';

import { generateTags } from '../headerUtils';

export const APPLICATIONS = [
    {
        name: 'Finance',
        tags: generateTags('Finance'),
        icon: <i className="fas fa-file-invoice-dollar"></i>,
        link: '/apps/finance'
    },
    {
        name: 'Machine Learning',
        tags: generateTags('Machine Learning'),
        icon: <i className="fas fa-cogs"></i>,
        link: '/machine-learning'
    },
    {
        name: 'Styles Showcase',
        tags: generateTags('Styles Showcase'),
        icon: <i className="fas fa-palette"></i>,
        link: '/style-showcase'
    },
];
