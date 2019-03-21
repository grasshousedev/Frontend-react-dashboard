import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';

import { getRequest, postRequest, deleteRequest, putRequest } from 'libs/requests/requests';

export default class BaseEntity {

    constructor (name, properties = {}) {
        this.name = name;
        this.baseUrl = properties.baseUrl || '';
        this.hasPagination = properties.hasPagination !== undefined
            ? properties.hasPagination : true;
    }

    getUrl (urlType, id) {
        switch (urlType) {
            case 'detail':
            case 'edit':
            case 'delete':
                return `${this.baseUrl}${id}/`;
            case 'get':
            case 'getAll':
            case 'add':
            default:
                return this.baseUrl;
        }
    }

    get(options = {}) {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        return getRequest(this.getUrl('get'), { timeout: 5000 }).then(response => {
            store.dispatch({ type: options.actionSet, data: response.data });
            if (!options.keepLoading) {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            }
            return response;
        }).catch(response => {
            if (response.response === undefined) {
                // assuming timeout
            }
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: true, loadingError: response });
            console.error('Impossible to load data: ', response);
            throw response.response;
        });
    }

    fetch (options) {
        const self = this;
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        return getRequest(this.getUrl('getAll'), { timeout: 5000 }).then(response => {
            const data = self.hasPagination ? response.results : response;
            store.dispatch({ type: options.actionSet, data });
            if (!options.keepLoading) {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            }
            return response;
        }).catch(response => {
            if (response === undefined) {
                // assuming timeout
            }
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: true, loadingError: response });
            console.error('Impossible to load data: ', response);
            throw response.response;
        });
    }

    delete (id) {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        return deleteRequest(this.getUrl('delete', id)).then(response => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            return response;
        }).catch(response => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: true, loadingError: response });
            throw response.response;
        });
    }

    save (entry) {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        if (entry.id) {
            // EDIT
            return putRequest(this.getUrl('edit', entry.id), entry).then(response => {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            }).catch(response => {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: true, loadingError: response });
            throw response.response;
        });
        } else {
            // ADD
            return postRequest(this.getUrl('add'), entry).then(response => {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            }).catch(response => {
                store.dispatch({ type: SET_APPLICATION_LOADING, loading: true, loadingError: response });
                throw response.response;
            });
        }
    }
};
