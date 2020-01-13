export const URLS = {
    FORECAST: 'https://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&encrypt=false&stop=',
};

export const DIRECTIONS = {
    inbound: 'Inbound',
    outbound: 'Outbound',
};

export const STATIONS = {
    DAW: {
        code: 'DAW',
        label: 'Dawson',
        order: 13,
        color: 'green',
        zones: ['Central'],
    },
    STS: {
        code: 'STS',
        label: "St. Stephen's Green",
        order: 14,
        color: 'green',
        zones: ['Central'],
    },
    HAR: {
        code: 'HAR',
        label: 'Harcourt',
        order: 15,
        color: 'green',
        zones: ['Central'],
    },
    GAL: {
        code: 'GAL',
        label: 'The Gallops',
        order: 29,
        color: 'green',
        zones: ['Green 4'],
    },
};

export const DEFAULT_MULTI_FORECAST_TIMEOUT = 1000 * 5;
