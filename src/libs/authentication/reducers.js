const authentication = (currentState, action) => {
    const state = currentState ? currentState : {
        user: null,
        loggedIn: false,
    };

    switch (action.type) {
        case 'LOGGING_IN':
            return { ...state, loggedIn: false };
        case 'REGISTER_USER':
            return { ...state, user: action.user, loggedIn: true };
        case 'LOGOUT':
            return { ...state, user: null, loggedIn: false };
        default:
            return state;
    }
};

export const reducers = {
    authentication,
};
