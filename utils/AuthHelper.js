export class AuthHelper {
  static #accessToken = null;

  static setAccessToken(token) {
    this.#accessToken = token;
  }

  static getAccessToken() {
    return this.#accessToken;
  }

  static getAuthHeader() {
    if (this.#accessToken) {
      return {
        'Authorization': `Bearer ${this.#accessToken}`
      };
    }
    return {};
  }

  static clearAccessToken() {
    this.#accessToken = null;
  }

  static isTokenExpired() {
    if (!this.#accessToken) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(this.#accessToken.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.log('Erro ao verificar expiração do token:', error);
      return true;
    }
  }
}
