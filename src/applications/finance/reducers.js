import * as actions from './actions';
import { createCategoriesTree } from './categories/categoriesDataUtils';

const INITIAL_STATE = {
    initialized: false,
    categories: [],
    categoriesTree: [],
};

const finance = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    let categories;
    switch (action.type) {
        case actions.INITIALIZE:
            return { ...state, initialized: true };
        case actions.SET_CATEGORIES:
            return { ...state, categories: action.data, categoriesTree: createCategoriesTree(action.data) };
        case actions.SET_CATEGORY:
            let updated = false;
            const category = action.data;
            categories = state.categories.map(cat => {
                if (cat.id === category.id) {
                    updated = true;
                    return category;
                }
                return cat;
            });
            if (!updated) categories.push(category);
            return { ...state, categories, categoriesTree: createCategoriesTree(categories) };
        case actions.DELETE_CATEGORY:
            categories = state.categories.filter(c => c.id !== action.id);
            return { ...state, categories, categoriesTree: createCategoriesTree(categories) };
        default:
            return state;
    }
};

export const reducers = {
    finance,
};
