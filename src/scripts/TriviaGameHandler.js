import TokenAPI from './TokenAPI';
import TriviaAPI from './TriviaAPI';

let questions;
let index;
let score;

export const getNumberOfQuestions = function getNumberOfQuestions() {
  return questions.length;
};

export const getCurrentIndex = function getCurrentIndex() {
  return index;
};

export const getCurrentQuestion = function getCurrentQuestion() {
  return questions[index];
};

export const getScore = function getScore() {
  return score;
};

export const getNextQuestion = function getNextQuestion() {
  index += 1;
  return questions[index];
};

export const checkAnswer = function checkIfAnswerIsCorrect(answer) {
  return answer === questions[index].correct_answer;
};

export const initiateGame = function initiateGame() {
  score = 0;
  index = -1;
  console.log(questions);
};

export const getGameData = async function getGameData(amount, category, difficulty) {
  try {
    // get or create token
    const token = await TokenAPI.getToken();
    // get trivia data
    const triviaData = await TriviaAPI.fetchTriviaData(amount, category, difficulty, token);

    console.log(triviaData);
    questions = triviaData.results;

    return true;
  } catch (error) {
    return false;
  }
};
