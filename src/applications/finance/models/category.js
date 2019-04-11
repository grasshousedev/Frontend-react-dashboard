import BaseEntity from "models/common/base";

import { SET_CATEGORIES, SET_CATEGORY, DELETE_CATEGORY } from '../actions';
export const BASE_URL = 'finance/api/category/';

export function newCategory() {
    return {
        id: null,
        name: '',
        attributes_ui: {
            color: '',
            icon: '',
        },
        users: [],
        parent: null,
    };
}

export class CategoryEntity extends BaseEntity {
    constructor (properties) {
        super('FinanceCategory', {
            baseUrl: BASE_URL,
            hasPagination: false,
            ...properties
        });
    }

    static emptyEntry () {
        return newCategory();
    }

    fetch (options) {
        return super.fetch({
            fetchActionSet: SET_CATEGORIES,
            ...options
        });
    }    

    get (id) {
        return super.get(id, { autoGet: true, actionSingleSet: SET_CATEGORY });
    }

    save (entry) {
        return super.save(entry, { autoGet: true, actionSingleSet: SET_CATEGORY });
    }

    delete (id) {
        return super.delete(id, { deleteAction: DELETE_CATEGORY });
    }
}

export const categoriesEntity = new CategoryEntity();
