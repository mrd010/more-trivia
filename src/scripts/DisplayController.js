import Template from './Template';

// ##############################################################
const closeStartGameForm = function closeStartANewGameForm() {
  const startGameForm = document.getElementById('start-form-container');
  const form = startGameForm.querySelector('form');
  const exitDuration = Number(
    getComputedStyle(form).getPropertyValue('transition-duration').slice(0, -1)
  );
  form.classList.remove('scale-y-100');
  document.querySelector('#landing-page header').classList.remove('opacity-0');

  setTimeout(
    () => {
      startGameForm.remove();
    },
    exitDuration * 1000 + 10
  );
};
// ##############################################################
const showStartGameForm = function showStartANewGameForm() {
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
  document.getElementById('close-form').addEventListener('click', closeStartGameForm);
  startGameForm.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Array.from(new FormData(e.target));
    console.log(formData);
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
  const landingPage = Template.createLandingPage();
  document.body.appendChild(landingPage);

  document.getElementById('start-game-button').addEventListener('click', showStartGameForm);
};

export default initialLoad;
