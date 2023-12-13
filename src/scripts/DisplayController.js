/* eslint-disable no-use-before-define */
import { getTransitionTime, isOverflown } from './ElementCreator';
import sleep from './Sleep';
import { loadSettings, saveSettings } from './StorageController';
import Template from './Template';
import TriviaAPI from './TriviaAPI';
import {
  checkAnswer,
  getCurrentIndex,
  getGameData,
  getNextQuestion,
  getNumberOfQuestions,
  getScore,
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
  const errorContainer = Template.createErrorElement(error.message, error.errorHeader);
  document.getElementById('start-form-container').appendChild(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
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
  const trTime = getTransitionTime(form);
  form.classList.remove('scale-y-100');
  document.querySelector('#landing-page header').classList.remove('opacity-0');

  await sleep(trTime * 1000 + 10);
  startGameForm.remove();
};

// ##############################################################
const goBackToHome = async function goBackToHome() {
  const currentContainer = document.body.firstElementChild;
  const trTime = getTransitionTime(currentContainer);
  currentContainer.style.opacity = '0';
  await sleep(trTime * 1000 + 100);
  currentContainer.remove();
  await sleep(10);
  showStartingScreen();
};
// ##############################################################
const displayGameOverScreen = async function displayGameOverScreen() {
  let trTime;
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.style.opacity = '0';
    trTime = getTransitionTime(gameContainer);
    await sleep(trTime * 1000 + 10);
    gameContainer.remove();
  }
  // create game over page
  const gameOverContainer = Template.createGameOverScreen(getScore(), getNumberOfQuestions());
  document.body.appendChild(gameOverContainer);
  await sleep(20);
  gameOverContainer.style.opacity = '1';
  trTime = getTransitionTime(gameOverContainer);
  await sleep(trTime * 1000 + 10);

  document.getElementById('score-container').style.opacity = '1';
  document.getElementById('home-screen-button').addEventListener('click', goBackToHome);
};

// ##############################################################
const showConfirmDialogue = function showConfirmDialogue() {
  const confirmContainer = Template.createConfirmAlert();
  const gameContainer = document.getElementById('game-container');
  gameContainer.classList.add('hidden');
  document.body.appendChild(confirmContainer);

  // events
  confirmContainer.querySelector('#no-button').addEventListener('click', () => {
    confirmContainer.remove();
    gameContainer.classList.remove('hidden');
  });
  confirmContainer.querySelector('#yes-button').addEventListener('click', goBackToHome);
};
// ##############################################################
const goToGamePhase = async function goToGamePhase() {
  // remove landing page
  const landingPage = document.getElementById('landing-page');
  await closeStartGameForm();
  let trTime = getTransitionTime(landingPage);
  landingPage.classList.add('opacity-0');
  landingPage.classList.remove('opacity-100');
  await sleep(trTime * 2 * 1000 + 10);
  landingPage.remove();
  // show game phase template
  const gameTemplate = Template.createGameTemplate();
  document.body.appendChild(gameTemplate);
  await sleep(10);
  gameTemplate.classList.add('opacity-100');
  trTime = getTransitionTime(gameTemplate);
  await sleep(trTime * 1000 + 10);
  gameTemplate.querySelector('#home button').addEventListener('click', () => {
    if (gameStarted) {
      showConfirmDialogue();
    }
  });
};

// ##############################################################
const updateProgressBar = async function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const trTime = getTransitionTime(progressBar);
  progressBar.style.width = `${Math.round(
    ((getCurrentIndex() + 1) / getNumberOfQuestions()) * 100
  )}%`;
  await sleep(trTime * 1000 + 10);
};
// ##############################################################
const showNextQuestion = async function showNextQuestion() {
  // if end of quiz
  const question = getNextQuestion();
  if (question === null) {
    await displayGameOverScreen();
    return;
  }

  // remove previous question
  let questionContainer = document.getElementById('questions-container');
  if (questionContainer) {
    const trTime = getTransitionTime(questionContainer);
    questionContainer.classList.add('opacity-0');
    questionContainer.classList.remove('opacity-100');
    await sleep(trTime * 1000 + 10);
    questionContainer.remove();
  }

  // create new question page
  questionContainer = Template.createQuestionContainer(getCurrentIndex(), question);
  document.getElementById('home').insertAdjacentElement('afterend', questionContainer);
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
        pulseTime = getTransitionTime(this);
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
      await updateProgressBar();
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
  const settings = loadSettings() || { amount: 10, category: 'any', difficulty: 'any' };
  const startGameForm = Template.createStartForm(settings);
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
    const amount = Number(formData[0][1]);
    const category = formData[1][1];
    const difficulty = formData[2][1];

    let receivedGameData;
    showFormLoading();
    try {
      receivedGameData = await getGameData(amount, category, difficulty);
      if (receivedGameData instanceof Error) {
        throw receivedGameData;
      } else {
        hideFormLoading();
        gameStarted = true;
        saveSettings({ amount, category, difficulty });
        await goToGamePhase();
        initiateGame();
        await showNextQuestion();
      }
    } catch (error) {
      displayError(error);
      hideFormLoading();
    }
  });
};

// ##############################################################
async function showStartingScreen() {
  // clear body
  document.body.replaceChildren();
  // reset vars
  isLoading = false;
  gameStarted = false;
  answerClicked = false;
  // create start screen
  const landingPage = Template.createLandingPage();

  document.body.appendChild(landingPage);
  await sleep(10);
  landingPage.classList.remove('scale-0');

  document.getElementById('start-game-button').addEventListener('click', showStartGameForm);
}
// ##############################################################
const initialLoad = function initializeAppAndLoadLandingPage() {
  document.documentElement.setAttribute('class', 'font-sans');
  // set body styles
  document.body.setAttribute(
    'class',
    'bg-slate-950 w-screen h-screen text-slate-50 grid items-center'
  );
  //   load landing page
  showStartingScreen();
};

export default initialLoad;
