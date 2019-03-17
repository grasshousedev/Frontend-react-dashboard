import * as actions from './actions';

const INITIAL_STATE = {
    user: null,
    loggedIn: false,
    storageLoginAttempt: false,
};

const authentication = (currentState, action) => {
    const state = currentState ? currentState : INITIAL_STATE;

    switch (action.type) {
        case actions.REGISTER_USER:
            return { ...state, user: action.user, loggedIn: true };
        case actions.LOGOUT:
            return { ...INITIAL_STATE };
        case actions.STORAGE_LOGIN_ATTEMPT:
            return { ...state, storageLoginAttempt: true };
        default:
            return state;
    }
};

export const reducers = {
    authentication,
};
