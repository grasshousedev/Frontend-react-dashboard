import { BACKEND_URL } from 'config';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export default function request(url, { payload, method = 'GET', headers = {}, body, extraOptions = {} }) {
    const params = {
        method,
        headers,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer',
        ...extraOptions
    };

    // Set auto header to JSON
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    if (body) {
        params.body = body;
    } else if (payload) {
        params.body = JSON.stringify(payload);
    }

    const requestUrl = url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0 ? url : `${BACKEND_URL}${url}`;

    return fetch(requestUrl, params)
        .then(response => response.json()); // parses response to JSON
}

export function get(url, options) {
    return request(url, options);
}

export function post(url, payload, options) {
    return request(url, { payload, method: 'POST', ...options });
}
