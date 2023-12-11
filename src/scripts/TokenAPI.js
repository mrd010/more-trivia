import { loadToken, saveToken, removeToken } from './StorageController';

class TokenAPI {
  static #token;

  static #baseApiTokenURL = 'https://opentdb.com/api_token.php';

  // ##############################################################
  static async getToken() {
    if (!this.#token) {
      const previousToken = loadToken();
      if (previousToken) {
        this.#token = previousToken;
        console.log('token loaded from storage');
      } else {
        this.#token = await this.#getNewToken();
        saveToken(this.#token);
        console.log('new token created');
      }
    }
    return this.#token;
  }

  // ##############################################################
  static async #getNewToken() {
    const response = await fetch(`${this.#baseApiTokenURL}?command=request`, { mode: 'cors' });
    if (!response.ok || response.status !== 200) {
      throw new Error(response.statusText);
    }
    const tokenObject = await response.json();
    if (tokenObject.response_code === 0) {
      return tokenObject.token;
    }
    throw new Error(tokenObject.response_message);
  }

  // ##############################################################
  static async resetToken() {
    if (this.#token) {
      const response = await fetch(
        `${this.#baseApiTokenURL}?command=request&token=${this.#token}`,
        {
          mode: 'cors',
        }
      );
      console.log(response);
      if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText);
      }
      const tokenObject = await response.json();
      if (tokenObject.response_code === 0) {
        this.#token = tokenObject.token;
      } else {
        throw new Error('renewal failed');
      }
    }
  }

  // ##############################################################
  static deleteToken() {
    this.#token = null;
    removeToken();
  }
}

export default TokenAPI;
