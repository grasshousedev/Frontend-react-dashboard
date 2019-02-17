// Decorate Error to get error data in a consistent way

export default class Exception extends Error {
    constructor(errorData) {
        super(errorData);
        this.errorData = errorData;
    }
    getErrorData = () => {
        return this.errorData;
    }
}
