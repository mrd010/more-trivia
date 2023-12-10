import Template from './Template';

const showStartGameForm = function showStartANewGameForm() {
  const startGameForm = Template.createStartForm();
  document.getElementById('landing-page').appendChild(startGameForm);
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
  const landingPage = Template.createLandingPage();
  document.body.appendChild(landingPage);

  document.getElementById('start-game-button').addEventListener('click', showStartGameForm);
};

export default initialLoad;
