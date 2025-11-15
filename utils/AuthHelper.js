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
}
