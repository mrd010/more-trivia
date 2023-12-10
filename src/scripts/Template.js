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
      'grid bg-slate-100 gap-2 px-2 py-4 transition-transform rounded-md text-slate-950 w-4/5 mx-auto max-w-md',
      ['action', '#']
    );
    // close button
    const closeBtn = createElementWithClasses('button', 'justify-self-end mr-2 text-slate-800', [
      'id',
      'close-form',
    ]);
    const closeBtnIcon = createElementWithClasses(
      'span',
      'material-symbols-rounded bg-slate-300/25 hover:bg-slate-400/25 active:bg-slate-600/25 transition-colors rounded-full p-1'
    );
    closeBtnIcon.textContent = 'close';
    closeBtn.appendChild(closeBtnIcon);
    startForm.appendChild(closeBtn);
    // loading container
    const loading = createContainer(
      'w-full hidden h-full fixed top-0 left-0 grid items-center justify-center bg-slate-900/25 backdrop-blur-[2px]',
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
    const container = createContainer('grid place-content-center w-full h-full', 'landing-page');
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
}

export default Template;
