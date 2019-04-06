import BaseEntity from "models/common/base";

import { SET_USERS } from '../actions';
export const BASE_URL = 'finance/api/user/';

export class UserEntity extends BaseEntity {
    constructor (properties) {
        super('FinanceUser', {
            baseUrl: BASE_URL,
            hasPagination: false,
            ...properties
        });
    }

    static emptyEntry () {
        throw new Error('User entity is read only');
    }

    fetch (options) {
        return super.fetch({
            fetchActionSet: SET_USERS,
            ...options
        });
    }    

    save () {
        throw new Error('User entity is read only');
    }

    delete () {
        throw new Error('User entity is read only');
    }
}

export const usersEntity = new UserEntity();
