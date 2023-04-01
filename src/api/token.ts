export default class tokenService {
    static getLocalRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static getLocalAccessToken() {
        return localStorage.getItem('accessToken');
    }

    static setLocalRefreshToken(refreshToken: string) {
        localStorage.setItem('refreshToken', refreshToken);
    }

    static setLocalAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
    }

    static deleteTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
