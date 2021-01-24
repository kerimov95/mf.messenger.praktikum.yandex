import { validate } from './utilities/validate.js'

window.consoleOutput = function (obj) {

    if (obj.elements && obj.elements.length > 0) {
        const count = obj.elements.length;
        const ob = {}

        for (let i = 0; i < count; i++) {

            let span = document.getElementById(obj.elements[i].id + 'error');

            let error = validate(obj.elements[i]);

            if (error != null) {
                span.innerText = error;
                obj.elements[i].classList.add('invalid');
            }
            else {
                obj.elements[i].classList.remove('invalid');
                span.innerText = '';
            }

            if (obj.elements[i] && obj.elements[i].value)
                ob[obj.elements[i].id] = obj.elements[i].value
        }

        console.log(ob)
    }

}