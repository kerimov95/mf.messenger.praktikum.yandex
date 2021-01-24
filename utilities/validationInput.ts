import { validate } from './validate.js'

(window as any).validateComments = (input: HTMLInputElement) => {

    let span = document.getElementById(input.id + 'error');

    input.onblur = () => {
        let error = validate(input);

        if (error != null) {
            (span as HTMLSpanElement).innerText = error;
            input.classList.add('invalid');
        }
    }

    input.onfocus = () => {
        input.classList.remove('invalid');
        (span as HTMLSpanElement).innerText = ''
    }
};