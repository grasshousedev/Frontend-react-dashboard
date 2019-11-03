import React from 'react';

import { Icon } from 'components/ui/Icon';

import { generateTags } from '../headerUtils';


export const APPLICATIONS = [
    {
        name: 'Finance',
        tags: generateTags('Finance'),
        icon: <Icon name="file-invoice-dollar" />,
        link: '/apps/finance'
    },
    {
        name: 'Machine Learning',
        tags: generateTags('Machine Learning'),
        icon: <Icon name="cogs" />,
        link: '/machine-learning'
    },
    {
        name: 'Styles Showcase',
        tags: generateTags('Styles Showcase'),
        icon: <Icon name="palette" />,
        link: '/style-showcase'
    },
];
