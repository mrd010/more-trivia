/* eslint-disable import/no-cycle */
import { isOverflown } from './ElementCreator';
import sleep from './Sleep';
import Template from './Template';
import TriviaAPI from './TriviaAPI';
import {
  checkAnswer,
  getCurrentIndex,
  getGameData,
  getNextQuestion,
  getNumberOfQuestions,
  initiateGame,
  playerChose,
} from './TriviaGameHandler';

let isLoading;
let answerClicked;
let gameStarted;

// ##############################################################
const showFormLoading = function showFormLoading() {
  if (!isLoading) {
    isLoading = true;
    document.getElementById('start-loading').classList.remove('hidden');
  }
};
// ##############################################################
const hideFormLoading = function hideFormLoading() {
  if (isLoading) {
    document.getElementById('start-loading').classList.add('hidden');
    isLoading = false;
  }
};
// ##############################################################
const displayError = function displayError(error) {
  console.error(error);
};
// ##############################################################
const setMaxAmountInput = async function setMaxAmountInput() {
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  try {
    showFormLoading();
    let maxAllowedAmount = await TriviaAPI.getMaxAmount(category, difficulty);
    hideFormLoading();
    maxAllowedAmount = Math.min(maxAllowedAmount, 50);
    const amount = document.getElementById('number-of-questions');
    amount.setAttribute('max', maxAllowedAmount);
    const currentValue = amount.value;
    amount.value = Math.min(maxAllowedAmount, currentValue);
  } catch (error) {
    displayError(error);
  }
};
// ##############################################################
const closeStartGameForm = async function closeStartANewGameForm() {
  const startGameForm = document.getElementById('start-form-container');
  const form = startGameForm.querySelector('form');
  const exitDuration = Number(
    getComputedStyle(form).getPropertyValue('transition-duration').slice(0, -1)
  );
  form.classList.remove('scale-y-100');
  document.querySelector('#landing-page header').classList.remove('opacity-0');

  await sleep(exitDuration * 1000 + 10);
  startGameForm.remove();
};

// ##############################################################
const goToGamePhase = async function goToGamePhase() {
  // remove landing page
  const landingPage = document.getElementById('landing-page');
  await closeStartGameForm();
  let trTime = getComputedStyle(landingPage).getPropertyValue('transition-duration').slice(0, -1);
  landingPage.classList.add('opacity-0');
  landingPage.classList.remove('opacity-100');
  await sleep(trTime * 2 * 1000 + 10);
  landingPage.remove();
  // show game phase template
  const gameTemplate = Template.createGameTemplate();
  document.body.appendChild(gameTemplate);
  await sleep(10);
  gameTemplate.classList.add('opacity-100');
  trTime = getComputedStyle(gameTemplate).getPropertyValue('transition-duration').slice(0, -1);
  await sleep(trTime * 1000 + 10);

  // SHOULD ADD RESTART BUTTON EVENT
};

// ##############################################################
const updateProgressBar = function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${Math.round(
    ((getCurrentIndex() + 1) / getNumberOfQuestions()) * 100
  )}%`;
};
// ##############################################################
const showNextQuestion = async function showNextQuestion() {
  let questionContainer = document.getElementById('questions-container');
  if (questionContainer) {
    const trTime = getComputedStyle(questionContainer)
      .getPropertyValue('transition-duration')
      .slice(0, -1);
    questionContainer.classList.add('opacity-0');
    questionContainer.classList.remove('opacity-100');
    await sleep(trTime * 1000 + 10);
    questionContainer.remove();
  }
  const question = getNextQuestion();

  // create question page
  questionContainer = Template.createQuestionContainer(getCurrentIndex(), question);
  document.getElementById('restart').insertAdjacentElement('afterend', questionContainer);
  await sleep(20);
  if (question.type === 'multiple') {
    document.querySelectorAll('#options button').forEach((button) => {
      if (isOverflown(button)) {
        button.classList.remove('text-2xl');
        button.classList.add('text-sm');
      }
    });
  }

  questionContainer.classList.add('opacity-100');

  answerClicked = false;

  // ##############################################################
  const displayAnswer = async function displayAnswer() {
    if (!answerClicked) {
      answerClicked = true;
      const chosenAnswer = this.getAttribute('data-value');
      const chosenAnswerIsCorrect = playerChose(chosenAnswer);
      let pulseTime = 0;
      let pulseCount = 0;
      if (chosenAnswerIsCorrect) {
        this.setAttribute('data-answer', 'correct');
      } else {
        this.setAttribute('data-answer', 'wrong');
        pulseTime = getComputedStyle(this).getPropertyValue('animation-duration').slice(0, -1);
        pulseCount = getComputedStyle(this).getPropertyValue('animation-iteration-count');
      }
      document.querySelectorAll('#options button').forEach((answerBtn) => {
        answerBtn.setAttribute('disabled', '');
        if (answerBtn !== this) {
          answerBtn.removeAttribute('data-answer');
          if (!chosenAnswerIsCorrect && checkAnswer(answerBtn.getAttribute('data-value'))) {
            answerBtn.setAttribute('data-answer', 'correct');
          }
        }
      });
      const trTime = Math.max(pulseTime * pulseCount * 1000, 1000);
      await sleep(trTime + 500);
      updateProgressBar();
      showNextQuestion();
    }
  };
  // event listeners
  document.querySelectorAll('#options button').forEach((answerBtn) => {
    answerBtn.addEventListener('click', displayAnswer, { once: true });
  });
};

// ##############################################################
const showStartGameForm = function showStartANewGameForm() {
  if (isLoading || gameStarted) {
    return;
  }
  // show form
  const startGameForm = Template.createStartForm();
  const landingPage = document.getElementById('landing-page');
  startGameForm.querySelector('form').classList.add('scale-y-0');
  landingPage.appendChild(startGameForm);
  setTimeout(() => {
    startGameForm.querySelector('form').classList.add('scale-y-100');
    landingPage.querySelector('header').classList.add('opacity-0');
  }, 10);

  // add events
  // close form event
  document.getElementById('close-form').addEventListener('click', closeStartGameForm);
  // change input event
  startGameForm.querySelector('#category').addEventListener('change', setMaxAmountInput);
  startGameForm.querySelector('#difficulty').addEventListener('change', setMaxAmountInput);
  // form submit event
  startGameForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isLoading || gameStarted) {
      return;
    }
    const formData = Array.from(new FormData(e.target));
    const amount = formData[0][1];
    const category = formData[1][1];
    const difficulty = formData[2][1];

    showFormLoading();
    const receivedGameData = await getGameData(amount, category, difficulty);
    hideFormLoading();
    if (receivedGameData) {
      gameStarted = true;
      await goToGamePhase();
      initiateGame();
      await showNextQuestion();
    }
  });
};
// ##############################################################
const initialLoad = function initializeAppAndLoadLandingPage() {
  document.documentElement.setAttribute('class', 'font-sans');
  // set body styles
  document.body.setAttribute(
    'class',
    'bg-slate-950 w-screen h-screen text-slate-50 grid items-center'
  );
  //   load landing page
  isLoading = false;
  gameStarted = false;
  const landingPage = Template.createLandingPage();
  document.body.appendChild(landingPage);

  document.getElementById('start-game-button').addEventListener('click', showStartGameForm);
};

export default initialLoad;
