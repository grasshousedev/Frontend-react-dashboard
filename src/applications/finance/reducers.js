import { listToObject } from 'utils/data';

import * as actions from './actions';
import { createCategoriesTree, createSubCategoriesTree } from './categories/categoriesDataUtils';

const INITIAL_STATE = {
    initialized: false,
    categories: {},
    contexts: {},
    categoriesTree: [],
    subCategoriesTree: {},
    moneyMovements: {},
    tags: {},
    users: {},
};

const updateCategories = (state, categories) => {
    const subCategoriesTree = {};
    const categoriesTree = createCategoriesTree(categories);
    createSubCategoriesTree(categoriesTree, subCategoriesTree);
    return { ...state, categories, categoriesTree, subCategoriesTree, };
};

const finance = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    let categories;
    let contexts;
    let moneyMovements;
    let tags;
    switch (action.type) {
        case actions.INITIALIZE:
            return { ...state, initialized: true };

        case actions.SET_CATEGORIES:
            categories = listToObject(action.data, 'id');
            return updateCategories(state, categories);
        case actions.SET_CATEGORY:
            const category = action.data;
            categories = { ...state.categories };
            categories[category.id] = category;
            return updateCategories(state, categories);
        case actions.DELETE_CATEGORY:
            categories = { ...state.categories };
            if (categories.hasOwnProperty(action.id)) delete categories[action.id];
            return updateCategories(state, categories);

        case actions.SET_CONTEXTS:
            contexts = listToObject(action.data, 'id');
            return { ...state, contexts };
        case actions.SET_CONTEXT:
            const context = action.data;
            contexts = { ...state.contexts };
            contexts[context.id] = context;
            return { ...state, contexts };
        case actions.DELETE_CONTEXT:
            contexts = { ...state.contexts };
            if (contexts.hasOwnProperty(action.id)) delete contexts[action.id];
            return { ...state, contexts };

        case actions.SET_MONEY_MOVEMENTS:
            moneyMovements = listToObject(action.data, 'id');
            return { ...state, moneyMovements };
        case actions.SET_MONEY_MOVEMENT:
            const moneyMovement = action.data;
            moneyMovements = { ...state.moneyMovements };
            moneyMovements[moneyMovement.id] = moneyMovement;
            return { ...state, moneyMovements };
        case actions.DELETE_MONEY_MOVEMENT:
            moneyMovements = { ...state.moneyMovements };
            if (moneyMovements.hasOwnProperty(action.id)) delete moneyMovements[action.id];
            return { ...state, moneyMovements };

        case actions.SET_TAGS:
            return { ...state, tags: listToObject(action.data, 'id') };
        case actions.SET_TAG:
            const tag = action.data;
            tags = { ...state.tags };
            tags[tag.id] = tag;
            return { ...state, tags };
        case actions.DELETE_TAG:
            tags = { ...state.tags };
            if (tags.hasOwnProperty(action.id)) delete tags[action.id];
            return { ...state, tags };

        case actions.SET_USERS:
            const users = listToObject(action.data, 'id');
            return { ...state, users };
        default:
            return state;
    }
};

export const reducers = {
    finance,
};
