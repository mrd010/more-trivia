import sleep from './Sleep';
import Template from './Template';
import TriviaAPI from './TriviaAPI';
import { getGameData, getNextQuestion, initiateGame } from './TriviaGameHandler';

let isLoading;
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
  const exitDuration = getComputedStyle(landingPage)
    .getPropertyValue('transition-duration')
    .slice(0, -1);
  landingPage.classList.add('opacity-0');
  await sleep(exitDuration * 1000 + 10);
  landingPage.remove();
  // show game phase template
  document.body.appendChild(Template.createGameTemplate());
};

// ##############################################################
const showNextQuestion = function showNextQuestion() {
  const question = getNextQuestion();
  console.log(question);

  const questionContainer = Template.createQuestionContainer(question);
};

// ##############################################################
const showStartGameForm = function showStartANewGameForm() {
  if (isLoading) {
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
    if (isLoading) {
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
      await goToGamePhase();
      initiateGame();
      showNextQuestion();
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
  const landingPage = Template.createLandingPage();
  document.body.appendChild(landingPage);

  document.getElementById('start-game-button').addEventListener('click', showStartGameForm);
};

export default initialLoad;
