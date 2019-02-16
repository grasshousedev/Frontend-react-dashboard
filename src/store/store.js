import { createStore, combineReducers } from 'redux';

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
const initializeStore = (initialReducers = {}) => {
    const store = createStore(createReducer(initialReducers));
  
    store.asyncReducers = {};
    store.registerReducer = (key, reducer) => {
        store.asyncReducers[key] = reducer;
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    };
  
    return store;
};
  
export default initializeStore;
