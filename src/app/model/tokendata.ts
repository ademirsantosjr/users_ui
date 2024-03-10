export class TokenData {
    username: string;
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
    constructor() {
        this.username = '';
        this.authenticated = false;
        this.accessToken = '';
        this.refreshToken = '';
    }
}