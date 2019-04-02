import { listToObject } from 'utils/data';

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
            categories = listToObject(action.data, 'id');
            return {
                ...state,
                categories,
                categoriesTree: createCategoriesTree(categories)
            };
        case actions.SET_CATEGORY:
            const category = action.data;
            categories = state.categories;
            categories[category.id] = category;
            return { ...state, categories, categoriesTree: createCategoriesTree(categories) };
        case actions.DELETE_CATEGORY:
            categories = state.categories;
            if (categories.hasOwnProperty(action.id)) delete categories[action.id];
            return { ...state, categories, categoriesTree: createCategoriesTree(categories) };
        default:
            return state;
    }
};

export const reducers = {
    finance,
};
