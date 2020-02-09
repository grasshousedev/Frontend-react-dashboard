import { DateTime } from 'luxon';
import convert from 'xml-js';

import { URLS } from './constants';
import { getRequest } from '../../../libs/requests/requests';


export function getLuasData(station, setState) {
    const options = {
        fetchParams: {},
        responseType: 'xml',
    };

    const getUpdateDate = () => {
        const dt = DateTime.local();
        return dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    }

    getRequest(`${URLS.FORECAST}${station.code}`, options).then(response => {
        setState(s => ({
            ...s,
            [station.code]: {
                luas: convert.xml2js(response, { compact: true }),
                lastUpdate: getUpdateDate()
            }
        }));
        // convert.xml2json(response, { compact: true, spaces: 4 });
    }).catch(error => {
        setState(s => ({
            ...s,
            [station.code]: {
                luas: null,
                lastUpdate: getUpdateDate(),
                error,
            }
        }));
    });
};
