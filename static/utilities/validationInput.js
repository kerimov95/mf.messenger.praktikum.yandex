import { validate } from './validate.js';
window.validateComments = (input) => {
    let span = document.getElementById(input.id + 'error');
    input.onblur = () => {
        let error = validate(input);
        if (error != null) {
            span.innerText = error;
            input.classList.add('invalid');
        }
    };
    input.onfocus = () => {
        input.classList.remove('invalid');
        span.innerText = '';
    };
};
//# sourceMappingURL=validationInput.js.map