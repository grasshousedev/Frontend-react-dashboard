import { DateTime } from 'luxon';
import convert from 'xml-js';

import { URLS } from './constants';
import { getRequest } from '../../../libs/requests/requests';


export function getLuasData(station, setState) {
    const options = {
        fetchParams: {},
        responseType: 'xml',
    };

    getRequest(`${URLS.FORECAST}${station.code}`, options).then(response => {
        const dt = DateTime.local();
        const updateDate = dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS);

        setState(s => ({
            ...s,
            [station.code]: {
                luas: convert.xml2js(response, { compact: true }),
                lastUpdate: updateDate
            }
        }));
        // convert.xml2json(response, { compact: true, spaces: 4 });
    });
};
