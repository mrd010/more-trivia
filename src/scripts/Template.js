import lists from './Lists';
import {
  createContainer,
  createElementWithClasses,
  appendChildren,
  createMaterialIcon,
} from './ElementCreator';
import styles from './Styles';

// ###################################################
class Template {
  // create start form #########################################
  static createStartForm(settings) {
    const formContainer = createContainer(
      'absolute z-10 rounded-lg w-full h-full grid items-center',
      'start-form-container'
    );
    const startForm = createElementWithClasses(
      'form',
      'grid bg-slate-100 gap-2 px-2 py-4 transition-transform duration-500 rounded-md text-slate-950 w-4/5 mx-auto max-w-md',
      ['action', '#']
    );
    // close button
    const closeBtn = createElementWithClasses(
      'button',
      'justify-self-end mr-2 text-slate-800',
      ['type', 'button'],
      ['id', 'close-form']
    );
    const closeBtnIcon = createElementWithClasses(
      'span',
      'material-symbols-rounded bg-slate-300/25 hover:bg-slate-400/25 active:bg-slate-600/25 transition-colors rounded-full p-1'
    );
    closeBtnIcon.textContent = 'close';
    closeBtn.appendChild(closeBtnIcon);
    startForm.appendChild(closeBtn);
    // loading container
    const loading = createContainer(
      'w-full hidden h-full z-20 fixed top-0 left-0 grid items-center justify-center bg-slate-900/25 backdrop-blur-[2px]',
      'start-loading'
    );
    const loader = createContainer('custom-loader');
    loading.appendChild(loader);
    startForm.appendChild(loading);
    // form content --
    let inputField;
    let label;
    let input;
    // number of q input
    inputField = createContainer(styles.inputFieldStyle);
    label = createElementWithClasses('label', styles.labelStyle, ['for', 'number-of-questions']);
    label.textContent = 'Number of Questions';
    input = createElementWithClasses(
      'input',
      styles.inputStyle,
      ['type', 'number'],
      ['id', 'number-of-questions'],
      ['name', 'amount'],
      ['min', '1'],
      ['max', '50'],
      ['step', '1'],
      ['value', settings.amount],
      ['required', true]
    );
    appendChildren(inputField, [label, input]);
    startForm.appendChild(inputField);
    // select category
    inputField = createContainer(styles.inputFieldStyle);
    label = createElementWithClasses('label', styles.labelStyle, ['for', 'category']);
    label.textContent = 'Select Category';
    input = createElementWithClasses(
      'select',
      styles.inputStyle,
      ['name', 'category'],
      ['id', 'category'],
      ['name', 'category'],
      ['required', true]
    );

    lists.categories.forEach((category, index) => {
      let value;
      if (category === 'Any Category') {
        value = 'any';
      } else {
        value = index + 8;
      }
      const opt = createElementWithClasses('option', 'text-sm', ['value', `${value}`]);
      opt.textContent = category;
      input.appendChild(opt);
    });
    input.value = settings.category;
    appendChildren(inputField, [label, input]);
    startForm.appendChild(inputField);
    // select difficulty
    inputField = createContainer(styles.inputFieldStyle);
    label = createElementWithClasses('label', styles.labelStyle, ['for', 'difficulty']);
    label.textContent = 'Select Difficulty';
    input = createElementWithClasses(
      'select',
      styles.inputStyle,
      ['name', 'difficulty'],
      ['id', 'difficulty'],
      ['required', true]
    );
    Object.entries(lists.difficulties).forEach((difficulty) => {
      const [value, text] = difficulty;
      const opt = createElementWithClasses('option', 'text-sm', ['value', `${value}`]);
      opt.textContent = text;
      input.appendChild(opt);
    });
    input.value = settings.difficulty;
    appendChildren(inputField, [label, input]);
    startForm.appendChild(inputField);
    // submit button
    inputField = createContainer('w-full p-2');
    const submitBtn = createElementWithClasses(
      'button',
      'text-center w-full rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 font-bold transition-colors py-2 text-slate-50',
      ['type', 'submit']
    );
    submitBtn.textContent = 'Start';
    inputField.appendChild(submitBtn);
    startForm.appendChild(submitBtn);
    formContainer.appendChild(startForm);

    return formContainer;
  }

  // create landing page #########################################
  static createLandingPage() {
    // create main container
    const container = createContainer(
      'grid place-content-center w-full h-full duration-500 transition-all scale-0',
      'landing-page'
    );
    // create header (page title)
    const header = createElementWithClasses(
      'header',
      'grid md:justify-items-center gap-4 place-content-center transition-opacity'
    );
    const title = createElementWithClasses(
      'h1',
      'text-5xl font-extrabold sm:text-6xl md:text-7xl lg:text-8xl font-display'
    );
    title.textContent = 'MoreTrivia';
    // start button
    const startBtn = createElementWithClasses(
      'button',
      'rounded-lg border-2 mx-2 hover:bg-slate-100/25 active:bg-slate-100 focus:bg-slate-100/25 active:text-slate-950 active:border-slate-950 font-bold transition-colors md:text-xl md:w-3/5 py-2',
      ['id', 'start-game-button']
    );
    startBtn.textContent = 'Start';
    appendChildren(header, [title, startBtn]);

    container.appendChild(header);
    return container;
  }

  // ########################################################
  static createGameTemplate() {
    const container = createContainer(
      'grid grid-rows-[auto_minmax(0,1fr)_auto] gap-10 h-screen sm:p-5 duration-500 transition-opacity opacity-0',
      'game-container'
    );
    // home button
    const btnContainer = createContainer('grid sm:place-self-end', 'home');
    const homeBtn = createElementWithClasses(
      'button',
      'p-2 m-2 font-bold rounded-lg bg-blue-900/25 shadow-sm sm:px-4 md:text-lg lg:text-xl lg:px-6 hover:bg-blue-900/40 active:bg-sky-800/50 transition-colors'
    );
    homeBtn.textContent = 'Home Screen';
    btnContainer.appendChild(homeBtn);

    // questions container
    const questionContainer = createContainer(
      'grid mx-4 max-h-full col-start-1 col-end-1 row-start-2 row-end-3 grid-rows-2',
      'questions-container'
    );

    // progress bar
    const progressBarContainer = createContainer(
      'w-auto mx-4 bg-slate-200 rounded-full h-2.5 mb-4 grid'
    );
    const progressBar = createContainer(
      'bg-blue-600 h-2.5 transition-[width] duration-1000 delay-200 rounded-full',
      'progress-bar'
    );
    progressBar.style.width = '0%';
    progressBarContainer.appendChild(progressBar);
    appendChildren(container, [btnContainer, questionContainer, progressBarContainer]);

    return container;
  }

  // ########################################################
  static #createMultipleOptions(correctAnswer, incorrectAnswers) {
    const optionsContainer = createElementWithClasses(
      'div',
      'grid gap-4 content-center p-2 my-4 lg:w-[50%] lg:mx-auto lg:grid-cols-2',
      ['id', 'options']
    );
    const answers = incorrectAnswers;

    const randomIndex = Math.floor(Math.random() * 4);
    answers.splice(randomIndex, 0, correctAnswer);
    answers.forEach((answer) => {
      const answerBtn = createElementWithClasses(
        'button',
        styles.multipleAnswerBtnStyle,
        ['data-answer', 'na'],
        ['data-value', `${answer}`]
      );
      answerBtn.textContent = answer;
      optionsContainer.appendChild(answerBtn);
    });
    return optionsContainer;
  }

  // ########################################################
  static #createBooleanOptions() {
    const optionsContainer = createElementWithClasses(
      'div',
      'grid grid-cols-2 gap-4 content-center p-4 lg:grid-cols-1 lg:grid-rows-[auto_auto] lg:w-[33%] lg:mx-auto',
      ['id', 'options']
    );
    // true button
    const trueBtn = createElementWithClasses(
      'button',
      styles.booleanAnswerBtnStyle,
      ['data-answer', 'na'],
      ['data-value', 'True']
    );
    trueBtn.textContent = 'True';
    // false button
    const falseBtn = createElementWithClasses(
      'button',
      styles.booleanAnswerBtnStyle,
      ['data-answer', 'na'],
      ['data-value', 'False']
    );
    falseBtn.textContent = 'False';

    appendChildren(optionsContainer, [trueBtn, falseBtn]);
    return optionsContainer;
  }

  // ########################################################
  static createQuestionContainer(index, triviaItem) {
    const questionContainer = createContainer(
      'grid mx-4 max-h-full col-start-1 col-end-1 duration-1000 ease-in-out row-start-2 row-end-3 grid-rows-2 opacity-0 transition-opacity',
      'questions-container'
    );

    // question details
    const questionDesc = createContainer(
      'bg-slate-200/10 relative rounded-2xl max-h-full px-2 py-6 lg:p-10 gap-1 grid lg:mx-[10%]'
    );
    const questionNumber = createElementWithClasses(
      'span',
      'font-bold px-4 py-1 text-xl bg-slate-50 text-slate-800 w-12 h-12 grid place-content-center italic rounded-full absolute top-0 left-10 lg:left-20 -translate-y-2/4 -translate-x-2/4 lg:w-20 lg:h-20 lg:text-3xl',
      ['id', 'index']
    );
    questionNumber.textContent = `#${index + 1}`;
    const questionText = createElementWithClasses('p', styles.questionTextStyle);
    questionText.innerHTML = triviaItem.question.toString();
    appendChildren(questionDesc, [questionNumber, questionText]);
    questionContainer.appendChild(questionDesc);
    // question options
    let optionsContainer = createContainer();

    if (triviaItem.type === 'boolean') {
      optionsContainer = this.#createBooleanOptions();
    } else if (triviaItem.type === 'multiple') {
      optionsContainer = this.#createMultipleOptions(
        triviaItem.correct_answer,
        triviaItem.incorrect_answers
      );
    }

    questionContainer.appendChild(optionsContainer);
    return questionContainer;
  }

  // ########################################################
  static createGameOverScreen = function createGameOverScreen(score, maxScore) {
    const gameOverContainer = createContainer(
      'grid gap-2 w-full h-full content-center duration-500 text-center sm:w-80 mx-auto transition-opacity opacity-0',
      'game-over-container'
    );
    const title = createElementWithClasses('h2', 'text-4xl p-2 font-bold font-display');
    // title
    title.textContent = 'Trivia Quiz Ended';
    // scoreboard
    const scoreboard = createContainer('bg-slate-50 p-2 sm:rounded-lg text-slate-950');
    const scoreboardTitle = createElementWithClasses('p', 'text-lg font-thin text-slate-950/70');
    scoreboardTitle.textContent = 'Your Score';
    const scoreContainer = createContainer(
      'flex gap-2 items-center text-5xl p-1 justify-center opacity-0 transition-opacity duration-500',
      'score-container'
    );
    const currentScoreSpan = createElementWithClasses('span', 'font-semibold', ['id', 'score']);
    currentScoreSpan.classList.add(
      `${styles.ratedStyle[Math.floor((score / maxScore) * (styles.ratedStyle.length - 1))]}`
    );
    currentScoreSpan.textContent = score;
    const slash = createElementWithClasses('span', 'text-2xl font-thin');
    slash.textContent = '/';
    const maxScoreSpan = createElementWithClasses('span', 'font-semibold', ['id', 'max-score']);
    maxScoreSpan.textContent = maxScore;
    appendChildren(scoreContainer, [currentScoreSpan, slash, maxScoreSpan]);
    appendChildren(scoreboard, [scoreboardTitle, scoreContainer]);

    // home button
    const homeBtn = createElementWithClasses(
      'button',
      'p-3 font-bold rounded-lg bg-blue-900/25 shadow-sm hover:bg-blue-900/40 active:bg-sky-800/50 transition-colors m-4 border-2 border-slate-50 sm:mx-0 md:text-lg lg:text-xl lg:px-6',
      ['id', 'home-screen-button']
    );
    homeBtn.textContent = 'Home Screen';
    appendChildren(gameOverContainer, [title, scoreboard, homeBtn]);
    return gameOverContainer;
  };

  // ########################################################
  static createConfirmAlert = function createConfirmAlert() {
    const confirmContainer = createContainer(
      'bg-slate-50 text-slate-950 p-4 rounded-lg flex flex-col items-center gap-2 mx-4 sm:w-max sm:justify-self-center',
      'confirm-container'
    );
    const confirmText = createElementWithClasses('p', 'px-4 text-lg');
    confirmText.textContent = 'Abandon current session and start a new game?';
    confirmContainer.appendChild(confirmText);
    // buttons
    const btnContainer = createContainer('grid grid-cols-2 items-center gap-5 py-2');
    // yes button
    const yesBtn = createElementWithClasses(
      'button',
      'grid grid-cols-[auto_100px] rounded-md text-slate-50 font-semibold items-center bg-green-700 active:bg-green-800 opacity-90 hover:opacity-100 transition-colors',
      ['id', 'yes-button']
    );
    let btnIcon = createMaterialIcon('rounded', 'px-2', 'close');
    let btnText = createElementWithClasses('span', 'border-l border-slate-100/40 py-2');
    btnText.textContent = 'Yes';
    appendChildren(yesBtn, [btnIcon, btnText]);
    // no button
    const noBtn = createElementWithClasses(
      'button',
      'grid grid-cols-[auto_100px] rounded-md text-slate-50 font-semibold items-center bg-red-700 active:bg-red-800 opacity-90 hover:opacity-100 transition-colors',
      ['id', 'no-button']
    );
    btnIcon = createMaterialIcon('rounded', 'px-2', 'done');
    btnText = createElementWithClasses('span', 'border-l border-slate-100/40 py-2');
    btnText.textContent = 'No';
    appendChildren(noBtn, [btnIcon, btnText]);

    appendChildren(btnContainer, [yesBtn, noBtn]);
    confirmContainer.appendChild(btnContainer);

    return confirmContainer;
  };

  // ########################################################
  static createErrorElement = function createErrorElement(errorMessage, errorTitle = 'Error') {
    const errorContainer = createContainer(
      'fixed top-0 m-6 rounded-lg border-2 border-slate-50 bg-red-700/80 hover:bg-red-700/100 opacity-90 hover:opacity-100 transition-all shadow-md p-2'
    );
    const errorHeader = createElementWithClasses(
      'h3',
      'text-slate-50 text-lg font-bold md:text-xl'
    );
    errorHeader.textContent = errorTitle;
    const errorText = createElementWithClasses('p', 'text-sm font-medium text-slate-50 md:text-md');
    errorText.textContent = errorMessage;
    appendChildren(errorContainer, [errorHeader, errorText]);
    return errorContainer;
  };
}

export default Template;
