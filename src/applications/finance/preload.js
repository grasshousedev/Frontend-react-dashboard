import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';
import { CategoryEntity } from './models/category';

export function preload() {
    return new Promise(resolve => {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });
        const categoriesEntity = new CategoryEntity();
        categoriesEntity.fetch().then(data => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            resolve();
        });
    });
}