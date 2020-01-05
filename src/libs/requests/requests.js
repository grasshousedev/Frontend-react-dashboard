import { BACKEND_URL } from 'config';
import Exception from 'libs/exceptions/exceptions';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export class RequestInvalid extends Exception {}
export class RequestError extends Exception {}

let logRequests = false;
let commonHeaders = {};
let mocks = {};

export function setLogRequests(v) {
    logRequests = v;
}

if (typeof window !== undefined)
    window.requestsSetLogRequests = setLogRequests;

export function setCommonHeaders(common) {
    commonHeaders = { ...common };
}

export function getCommonHeaders() {
    return { ...commonHeaders };
}

export function setMock(url, response) {
    mocks[url] = response;
}

export function removeMock(url) {
    mocks[url] && delete mocks[url];
}

export default function request(
    url,
    { payload, method = METHODS.GET, headers = {}, body, extraOptions = {}, fetchParams, responseType='json', returnResponse=false } = {}
) {

    if (mocks[url]) {
        if (logRequests)
            console.info('Return mocked response for ', url, mocks[url]);
        return new Promise(resolve => {
            resolve(mocks[url]);
        });
    }

    const params = fetchParams ||
        {
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
    if (params.headers && payload && !params.headers['Content-Type']) {
        params.headers['Content-Type'] = 'application/json';
    }

    if (body) {
        params.body = body;
    } else if (payload) {
        params.body = JSON.stringify(payload);
    }

    const requestUrl = url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0 ? url : `${BACKEND_URL}${url}`;

    if (logRequests)
        console.info(`Request [${params.method}]: `, url, params);
    return fetch(requestUrl, params)
        .then(response => {
            if (logRequests)
                console.info('Request: response to ', url, response);
            if (!response.ok) {
                console.error('Request: Invalid!', response.status, response.statusText);
                throw new RequestInvalid(response);
            }

            if (returnResponse) return response;

            return response.status !== 204 && responseType === 'json' ? response.json() : response.text();
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
