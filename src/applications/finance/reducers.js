import * as actions from './actions';
import { createCategoriesTree } from './categories/categoriesDataUtils';

const INITIAL_STATE = {
    initialized: false,
    categories: [],
    categoriesTree: [],
};

const finance = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    switch (action.type) {
        case actions.INITIALIZE:
            return { ...state, initialized: true };
        case actions.SET_CATEGORIES:
            return { ...state, categories: action.data, categoriesTree: createCategoriesTree(action.data) };
        default:
            return state;
    }
};

export const reducers = {
    finance,
};
