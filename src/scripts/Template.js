import lists from './Lists';
import { createContainer, createElementWithClasses, appendChildren } from './ElementCreator';
import styles from './Styles';

// ###################################################
class Template {
  // create start form #########################################
  static createStartForm() {
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
      ['value', '10'],
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
      'grid place-content-center w-full h-full duration-500 transition-opacity opacity-100',
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
      'gameContainer'
    );
    // restart button
    const btnContainer = createContainer('grid sm:place-self-end', 'restart');
    const restartBtn = createElementWithClasses(
      'button',
      'p-2 m-2 font-bold rounded-lg bg-blue-900/25 shadow-sm sm:px-4 md:text-lg lg:text-xl lg:px-6 hover:bg-blue-900/40 active:bg-sky-800/50 transition-colors'
    );
    restartBtn.textContent = 'Restart';
    btnContainer.appendChild(restartBtn);

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
}

export default Template;
