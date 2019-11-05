import React from 'react';

import { Icon } from 'components/ui/Icon';

import { generateTags } from '../headerUtils';


export const APPLICATIONS = [
    {
        name: 'Finance',
        tags: generateTags('Finance'),
        icon: <Icon name="monetization_on" size="bigger" />,
        link: '/apps/finance'
    },
    {
        name: 'Machine Learning',
        tags: generateTags('Machine Learning'),
        icon: <Icon name="settings" size="bigger" />,
        link: '/machine-learning'
    },
    {
        name: 'Styles Showcase',
        tags: generateTags('Styles Showcase'),
        icon: <Icon name="palette" size="bigger" />,
        link: '/style-showcase'
    },
];
