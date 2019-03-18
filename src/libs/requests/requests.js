import { BACKEND_URL } from 'config';
import Exception from 'libs/exceptions/exceptions';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

let commonHeaders = {};

export function setCommonHeaders(common) {
    commonHeaders = { ...common };
}

export function getCommonHeaders() {
    return { ...commonHeaders };
}

export default function request(
    url,
    { payload, method = METHODS.GET, headers = {}, body, extraOptions = {} }
) {
    const params = {
        method,
        headers: { ...getCommonHeaders(), ...headers },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer',
        ...extraOptions
    };

    // Set auto header to JSON
    if (!params.headers['Content-Type']) {
        params.headers['Content-Type'] = 'application/json';
    }

    if (body) {
        params.body = body;
    } else if (payload) {
        params.body = JSON.stringify(payload);
    }

    const requestUrl = url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0 ? url : `${BACKEND_URL}${url}`;

    console.log(`Request [${params.method}]: `, url, params);
    return fetch(requestUrl, params)
        .then(response => {
            console.log('Request: response to ', url, response);
            if (!response.ok) {
                console.error('Request: Invalid!', response.status, response.statusText);
                throw new RequestInvalid(response);
            }
            return response.json();
        })
        .catch(error => {
            if (error instanceof RequestInvalid) throw error;

            throw new RequestError(error);
        });
}

export function getRequest(url, options = {}) {
    return request(url, options);
}

export function postRequest(url, payload, options = {}) {
    return request(url, { payload, method: METHODS.POST, ...options });
}

export function deleteRequest(url, payload, options = {}) {
    return request(url, { payload, method: METHODS.DELETE, ...options });
}

export function putRequest(url, payload, options = {}) {
    return request(url, { payload, method: METHODS.PUT, ...options });
}

export class RequestInvalid extends Exception {}
export class RequestError extends Exception {}
