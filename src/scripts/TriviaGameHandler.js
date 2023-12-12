import { HTMLtoText } from './ElementCreator';
import TokenAPI from './TokenAPI';
import TriviaAPI from './TriviaAPI';

let questions;
let playerChoice;
let index;
let score;

const convertHTMLValues = function convertHTMLValues(dataList) {
  const newList = [];
  dataList.forEach((qData) => {
    const newData = qData;
    newData.question = HTMLtoText(newData.question);
    newData.correct_answer = HTMLtoText(newData.correct_answer);

    if (newData.type === 'multiple') {
      const tempArr = [];
      newData.incorrect_answers.forEach((answer) => {
        tempArr.push(HTMLtoText(answer));
      });
      newData.incorrect_answers = tempArr;
    }
    newList.push(newData);
  });
  return newList;
};

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

export const increaseScore = function increaseScore() {};

export const checkAnswer = function checkIfAnswerIsCorrect(answer) {
  return answer === questions[index].correct_answer;
};

export const playerChose = function playerChose(chosenAnswer) {
  playerChoice = chosenAnswer;
  if (checkAnswer(playerChoice)) {
    score += 1;
    return true;
  }
  return false;
};

export const getNextQuestion = function getNextQuestion() {
  index += 1;
  return questions[index];
};

export const initiateGame = function initiateGame() {
  score = 0;
  index = -1;
};

export const getGameData = async function getGameData(amount, category, difficulty) {
  try {
    // get or create token
    const token = await TokenAPI.getToken();
    // get trivia data
    const triviaData = await TriviaAPI.fetchTriviaData(amount, category, difficulty, token);
    questions = convertHTMLValues(triviaData.results);
    console.log(questions);

    return true;
  } catch (error) {
    return false;
  }
};
