import * as actions from './actions';

const INITIAL_STATE = {
    loading: false,
    initialized: false,
};

const dashboard = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    switch (action.type) {
        case actions.SET_APPLICATION_INITIALIZED:
            return { ...state, initialized: action.initialized };
        case actions.SET_APPLICATION_LOADING:
            return { ...state, loading: action.loading };
        default:
            return state;
    }
};

export const reducers = {
    dashboard,
};
