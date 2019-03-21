import * as actions from './actions';

const INITIAL_STATE = {
    initialized: false,
    categories: [],
};

const finance = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    switch (action.type) {
        case actions.INITIALIZE:
            return { ...state, initialized: true };
        case actions.SET_CATEGORIES:
            return { ...state, categories: action.data };
        default:
            return state;
    }
};

export const reducers = {
    finance,
};
