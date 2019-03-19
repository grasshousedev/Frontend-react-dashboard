import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';

export function preload() {
    return new Promise(resolve => {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        setTimeout(() => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            resolve();
        }, 2000);
    });
}