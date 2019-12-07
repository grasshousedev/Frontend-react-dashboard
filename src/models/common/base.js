import { store } from 'store/store';
import { setApplicationLoading } from 'store/utils';

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

    get(id, options = {}) {
        setApplicationLoading(true);
        return getRequest(this.getUrl('detail', id), { timeout: 5000 }).then(response => {
            options.actionSingleSet && store.dispatch({ type: options.actionSingleSet, data: response });
            if (!options.keepLoading) {
                setApplicationLoading(false);
            }
            return response;
        }).catch(response => {
            if (response.response === undefined) {
                // assuming timeout
            }
            setApplicationLoading(false);
            console.error('Impossible to load data: ', response);
            throw response.response;
        });
    }

    fetch (options) {
        const self = this;
        setApplicationLoading(true);
        return getRequest(this.getUrl('getAll'), { timeout: 5000 }).then(response => {
            let data = self.hasPagination ? response.results : response;
            if (options.mapData) {
                data = options.mapData(data);
            }
            options.fetchActionSet && store.dispatch({ type: options.fetchActionSet, data });
            if (!options.keepLoading) {
                setApplicationLoading(false);
            }
            return response;
        }).catch(response => {
            if (response === undefined) {
                // assuming timeout
            }
            setApplicationLoading(false);
            console.error('Impossible to load data: ', response);
            throw response.response;
        });
    }

    delete (id, options = {}) {
        setApplicationLoading(true);
        return deleteRequest(this.getUrl('delete', id)).then(response => {
            setApplicationLoading(false);
            options.deleteAction && store.dispatch({ type: options.deleteAction, id });            return response;
        }).catch(response => {
            setApplicationLoading(false);
            throw response.response;
        });
    }

    save (entry, options = {}) {
        setApplicationLoading(true);
        if (entry.id) {
            // EDIT
            return putRequest(this.getUrl('edit', entry.id), entry).then(response => {
                setApplicationLoading(false);
                if (options.autoGet) {
                    return this.get(entry.id, options);
                } else {
                    return response;
                }
            }).catch(response => {
                setApplicationLoading(false);
            throw response.response;
        });
        } else {
            // ADD
            return postRequest(this.getUrl('add'), entry).then(response => {
                options.actionSingleSet && store.dispatch({ type: options.actionSingleSet, data: response });
                setApplicationLoading(false);
                return response;
            }).catch(response => {
                setApplicationLoading(false);
                throw response.response;
            });
        }
    }
};
