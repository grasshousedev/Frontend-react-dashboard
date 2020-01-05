import { getRequest, postRequest, setCommonHeaders, getCommonHeaders } from 'libs/requests/requests';
import { store } from 'store/store';
import Exception from 'libs/exceptions/exceptions';
import * as actions from './actions';

class Authentication {
    constructor() {
        this.token = null;
        this.user = null;
    }

    requestAuthentication = (username, password) => {
        return postRequest('api-token-auth/', { username, password })
            .then(response => {
                this.token = response.token;
                this.processNewToken();
                return response;
            })
            .catch(exception => {
                console.error('Authentication: Cannot authenticate:', exception);
                throw new AuthenticationError(exception.getErrorData());
            });
    }

    getStorageLoggedUserToken = () => {
        return new Promise((resolve, reject) => {
            if (Storage) {
                const token = localStorage.getItem('loggedUserToken');
                if (token) {
                    this.token = token;
                    this.setCommonAuthHeaders();
                }
                resolve({ token: token !== 'null' ? token : null });
            }
            resolve({ token: null });
        });
      }

    setStorageLoggedUserToken = () => {
        const token = this.token;
        return new Promise((resolve, reject) => {
            if (Storage) {
                if (token) {
                    localStorage.setItem('loggedUserToken', token);
                } else {
                    localStorage.removeItem('loggedUserToken');
                }
                resolve({ stored: true });
            }
            resolve({ stored: false });
        });
    }

    setCommonAuthHeaders = () => {
        if (this.token)
            setCommonHeaders({ 'Authorization': `Token ${this.token}` });
    }

    processNewToken = () => {
        this.setCommonAuthHeaders();
        return this.setStorageLoggedUserToken().then(this.getLoggedUser);
    }

    getLoggedUser = () => {
        return getRequest('dashboard/api/logged-user/').then((data) => {
            this.user = data;
            store.dispatch({ type: actions.REGISTER_USER, user: data });
            return data;
        }).catch(error => {
            console.warn('Cannot authenticate user.', error);
            this.clearAuthentication();
        });
    }

    logout = () => {
        this.user = null;
        this.clearAuthentication();
        store.dispatch({ type: actions.LOGOUT });
    }

    clearAuthentication = () => {
        this.token = null;
        const commonHeaders = getCommonHeaders();
        if (commonHeaders['Authorization'])
            delete commonHeaders['Authorization'];
        setCommonHeaders(commonHeaders);
        this.setStorageLoggedUserToken();
    }

    getCurrentUser = () => {
        return { ...this.user };
    }

    storageAutoLogin = () => {
        function completeOperation(resolve, success, userData) {
            store.dispatch({ type: actions.STORAGE_LOGIN_ATTEMPT, value: true });
            resolve({ success, userData });
        }
        return new Promise((resolve, reject) => {
            this.getStorageLoggedUserToken().then(data => {
                if (data.token) {
                    this.getLoggedUser().then(userData => {
                        completeOperation(resolve, true, userData);
                    });
                } else {
                    completeOperation(resolve, false);
                }
            });
        });
    }
}

export const authenticationService = new Authentication();

export class AuthenticationError extends Exception {};
