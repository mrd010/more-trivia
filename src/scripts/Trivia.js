class Trivia {
  static #token;
  static #baseApiURL = 'https://opentdb.com/api.php';
  static #baseApiTokenURL = 'https://opentdb.com/api_token.php';

  // ##############################################################

  static async #getToken() {
    const response = await fetch(`${this.#baseApiTokenURL}?command=request`, { mode: 'cors' });
    console.log(response);
    const r = await response.json();
    console.log(r);
  }

  // ##############################################################
  static async getTriviaData(amount, category, difficulty) {
    console.log(amount, category, difficulty);
    if (!this.#token) {
      this.#token = await this.#getToken();
    }

    // const catOptionStr = category === 'any' ? '' : `&category=${category}`;
    // const diffOptionStr = difficulty === 'any' ? '' : `&difficulty=${difficulty}`;
    // const response = await fetch(
    //   `${this.#baseApiURL}?amount=${amount}${catOptionStr}${diffOptionStr}`,
    //   {
    //     mode: 'cors',
    //   }
    // );
    // console.log(response);
  }
}

export default Trivia;
