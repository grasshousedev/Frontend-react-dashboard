import { store } from 'store/store';

export function getCurrentUser() {
    return store.getState().authentication.user;
}