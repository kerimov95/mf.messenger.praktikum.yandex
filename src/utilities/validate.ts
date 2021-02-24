export interface IValidateInput {
    maxLength?: number;
    minLength?: number;
    requred?: boolean;
    type?: typeInput;
}

export enum typeInput {
    /* eslint-disable no-unused-vars */
    email,
    phone
}

function visualizationOfvalidation(input: HTMLInputElement, valid = false) {
  const error = document.getElementById(`${input.id}error`);

  if (valid || input.checkValidity()) {
    input.classList.remove('invalid');
    if (error) {
      error.innerText = '';
    }
  } else {
    input.classList.add('invalid');
    if (error) {
      error.innerText = input.validationMessage;
    }
  }
}

function validateTextInput(value: string, validate: IValidateInput): string {
  if (validate.requred && value.length === 0) {
    return `Обязательное поле`;
  }

  if (validate.maxLength && validate.maxLength < value.length) {
    return `Длина не может быть больше ${validate.maxLength}`;
  }

  if (validate.minLength && validate.minLength > value.length) {
    return `Длина не может быть меньше ${validate.minLength}`;
  }

  /* eslint-disable max-len */
  const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([a-z][a-z\.]*[a-z])$/;
  if (validate.type === typeInput.email && !regEmail.test(value)) {
    return 'Неверный email';
  }

  const regPhone = /^((8|\+7)[- ]?)?((\d{3})?[- ]?)?[\d- ]{7,10}$/;
  if (validate.type === typeInput.phone && !regPhone.test(value)) {
    return 'Неверный номер телефона';
  }

  return '';
}

function validateForm<T>(form: HTMLFormElement): T | false {
  const errors: string[] = [];
  const obj: any = {};

  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i] as HTMLInputElement;
    obj[element.id] = element.value;

    visualizationOfvalidation(element);

    if (!element.checkValidity()) {
      errors.push(element.validationMessage);
    }
  }

  if (errors.length > 0) {
    return false;
  } else {
    return obj as T;
  }
}

export {validateTextInput, validateForm, visualizationOfvalidation};
