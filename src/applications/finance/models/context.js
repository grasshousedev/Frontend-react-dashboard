import BaseEntity from "models/common/base";

import { SET_CONTEXTS, SET_CONTEXT, DELETE_CONTEXT } from '../actions';
export const BASE_URL = 'finance/api/context/';

export function newContext() {
    return {
        id: null,
        name: '',
        attributes_ui: {
            color: '',
            icon: '',
        },
        tags: [],
        description: '',
        start_date: null,
        end_date: null,
        users: [],        
        parent: null,
    };
}

export class ContextEntity extends BaseEntity {
    constructor (properties) {
        super('FinanceContext', {
            baseUrl: BASE_URL,
            hasPagination: false,
            ...properties
        });
    }

    static emptyEntry () {
        return newContext();
    }

    fetch (options) {
        return super.fetch({
            fetchActionSet: SET_CONTEXTS,
            ...options
        });
    }    

    save (entry) {
        return super.save(entry, { autoGet: true, actionSingleSet: SET_CONTEXT });
    }

    delete (id) {
        return super.delete(id, { deleteAction: DELETE_CONTEXT });
    }
}

export const contextsEntity = new ContextEntity();
