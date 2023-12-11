import { saveToken, loadToken } from './StorageController';
import TokenAPI from './TokenAPI';
import CustomError from './CustomError';

class TriviaAPI {
  static #settings;

  static #baseApiURL = 'https://opentdb.com/api.php';

  static #baseApiCategoryCountURL = 'https://opentdb.com/api_count.php';

  // ##############################################################
  static async getMaxAmount(category, difficulty) {
    // no maximum for any category
    if (category === 'any') {
      return 500;
    }

    const response = await fetch(`${this.#baseApiCategoryCountURL}?category=${category}`, {
      mode: 'cors',
    });
    if (response.ok && response.status === 200) {
      const difficultyOptStr = `_${difficulty}`;
      const categoryMaxQuestions = await response.json();
      return categoryMaxQuestions.category_question_count[
        `total${difficulty === 'any' ? '' : difficultyOptStr}_question_count`
      ];
    }
    throw new Error(response.statusText);
  }

  // ##############################################################

  static async #errorHandler(code) {
    if (code === 1) {
      throw new CustomError(
        'No Results',
        "Could not return results. The API doesn't have enough questions for your query."
      );
    } else if (code === 2) {
      throw new CustomError(
        'Invalid Parameter',
        "Contains an invalid parameter. Arguments passed in aren't valid."
      );
    } else if (code === 3) {
      TokenAPI.deleteToken();
      throw new CustomError('Token Not Found', 'Session Token does not exist.');
    } else if (code === 4) {
      TokenAPI.resetToken();
      throw new CustomError(
        'Token Empty',
        'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.'
      );
    } else if (code === 5) {
      throw new CustomError(
        'Rate Limit',
        'Too many requests have occurred. Each IP can only access the API once every 5 seconds.'
      );
    }
  }

  // ##############################################################
  static async #fetchTriviaData(amount, category, difficulty, token) {
    const catOptionStr = category === 'any' ? '' : `&category=${category}`;
    const diffOptionStr = difficulty === 'any' ? '' : `&difficulty=${difficulty}`;
    const tokenOptionStr = token === undefined ? '' : `&token=${token}`;

    const response = await fetch(
      `${this.#baseApiURL}?amount=${amount}${catOptionStr}${diffOptionStr}${tokenOptionStr}`,
      {
        mode: 'cors',
      }
    );
    if (!response.ok || response.status !== 200) {
      throw new Error(response.statusText);
    }
    const triviaData = await response.json();
    if (triviaData.response_code === 0) {
      return triviaData;
    }
    this.#errorHandler(triviaData.response_code);
  }

  // ##############################################################
  static async startTriviaGame(amount, category, difficulty) {
    try {
      // get or create token
      const token = await TokenAPI.getToken();

      // check validity of amount entered
      if (category !== 'any') {
        const maxAllowedAmount = await this.getMaxAmount(category, difficulty);
        if (maxAllowedAmount < amount) {
          throw new Error(
            `There is not enough questions with this settings. max allowed amount: ${maxAllowedAmount}`
          );
        }
      }

      const triviaData = await this.#fetchTriviaData(amount, category, difficulty, token);
      console.log(triviaData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // ##############################################################
  static setSettings(amount, category, difficulty) {
    this.#settings = { amount, category, difficulty };
  }
}

export default TriviaAPI;
