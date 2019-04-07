import { store } from 'store/store';
import { SET_APPLICATION_LOADING } from 'store/actions';
import { categoriesEntity } from './models/category';
import { contextsEntity } from './models/context';
import { moneyMovementsEntity } from './models/moneyMovement';
import { usersEntity } from './models/user';
import { INITIALIZE } from './actions';

export function preload() {
    return new Promise(resolve => {
        store.dispatch({ type: SET_APPLICATION_LOADING, loading: true });

        const preloadPromises = [
            categoriesEntity.fetch(),
            contextsEntity.fetch(),
            moneyMovementsEntity.fetch(),
            usersEntity.fetch(),
        ];

        Promise.all(preloadPromises).then(() => {
            store.dispatch({ type: SET_APPLICATION_LOADING, loading: false });
            store.dispatch({ type: INITIALIZE });
            resolve();
        });
    });
}