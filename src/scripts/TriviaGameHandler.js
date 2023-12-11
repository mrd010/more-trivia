import TokenAPI from './TokenAPI';
import TriviaAPI from './TriviaAPI';

let questions;
let score;

export const getNextQuestion = function getNextQuestion() {
  return questions.next().value;
};

export const initiateGame = function initiateGame() {
  score = 0;
  console.log(questions);
};

export const getGameData = async function getGameData(amount, category, difficulty) {
  try {
    // get or create token
    const token = await TokenAPI.getToken();
    // get trivia data
    const triviaData = await TriviaAPI.fetchTriviaData(amount, category, difficulty, token);

    questions = triviaData.results.entries();

    return true;
  } catch (error) {
    return false;
  }
};
