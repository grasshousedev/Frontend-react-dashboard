import BaseEntity from "models/common/base";

import { SET_TAGS, SET_TAG, DELETE_TAG } from '../actions';
export const BASE_URL = 'finance/api/money-movement-tags/';

export function newTag() {
    return {
        id: null,
        name: '',
        slug: '',
        count: 0,
    };
}

export class TagEntity extends BaseEntity {
    constructor (properties) {
        super('FinanceMoneyMovementTag', {
            baseUrl: BASE_URL,
            hasPagination: false,
            ...properties
        });
    }

    static emptyEntry () {
        return newTag();
    }

    fetch (options) {
        return super.fetch({
            fetchActionSet: SET_TAGS,
            ...options
        });
    }    

    save (entry) {
        return super.save(entry, { autoGet: true, actionSingleSet: SET_TAG });
    }

    delete (id) {
        return super.delete(id, { deleteAction: DELETE_TAG});
    }
}

export const tagsEntity = new TagEntity();

