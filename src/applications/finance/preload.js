import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';
import { CategoryEntity } from './models/category';
import { MoneyMovementEntity } from './models/moneyMovement';

export function preload() {
    return new Promise(resolve => {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });

        const categoriesEntity = new CategoryEntity();
        const mmEntity = new MoneyMovementEntity();
        const preloadPromises = [
            categoriesEntity.fetch(),
            mmEntity.fetch(),
        ];

        Promise.all(preloadPromises).then(() => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            resolve();
        });
    });
}