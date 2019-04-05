import { store } from './store';
import { SET_APPLICATION_LOADING } from './actions';

export function setApplicationLoading(isLoading) {
    store.dispatch({ type: SET_APPLICATION_LOADING, loading: isLoading });
}
