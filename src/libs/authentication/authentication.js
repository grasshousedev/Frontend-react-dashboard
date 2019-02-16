import { post } from 'libs/requests/requests';

class AuthenticationService {
    constructor() {
        this.user = null;
    }

    login = (username, password) => {
        return post('/api-token-auth/', { username, password }).then(response => {
            console.log(response);
            return response;
        });
    }

}

export const authentication = new AuthenticationService();
