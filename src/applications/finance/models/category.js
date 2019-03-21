import BaseEntity from "models/common/base";

import { SET_CATEGORIES } from '../actions';
export const BASE_URL = 'finance/api/category/';

export class CategoryEntity extends BaseEntity {
    constructor (properties) {
        super('FinanceCategory', {
            baseUrl: BASE_URL,
            hasPagination: false,
            ...properties
        });
    }

    static emptyEntry () {
        return {
            id: null,
            name: '',
            attributes_ui: {},
            users: [],
            parent: null,
        };
    }

    fetch (options) {
        return super.fetch({
            actionSet: SET_CATEGORIES,
            ...options
        });
    }    
}