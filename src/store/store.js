import { createStore, combineReducers } from 'redux';
import { reducers as dashboardReducers } from './reducers';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = asyncReducers =>
    combineReducers({
        ...asyncReducers
    });

/**
 * Initialize the store.
 * Add a method to inject reducers from the tree.
 */
const initializeStore = () => {
    const store = createStore(
        s => s,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  
    store.asyncReducers = {};
    store.registerReducer = (key, reducer) => {
        store.asyncReducers[key] = reducer;
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    };
  
    return store;
};

export const store = initializeStore();
store.registerReducer('dashboard', dashboardReducers.dashboard);

if (process.env.NODE_ENV === 'development')
    window.store = store;
