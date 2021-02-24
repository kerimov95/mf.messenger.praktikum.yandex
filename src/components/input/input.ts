import {Block} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './input.template';
import {validateTextInput} from '../../utilities/validate';
import {IValidateInput} from '../../utilities/validate';
import {visualizationOfvalidation} from '../../utilities/validate';

export interface Iinput {
    id: string;
    value?: string;
    name?: string;
    label?: string;
    type?: string;
    autocomplete?: boolean;
    className?: string;
    validate?: IValidateInput;
    placeholder?: string;
    message?: string;
    disabled?: boolean;
}

export class InputComponent extends Block<Iinput> {
  constructor(props: Iinput) {
    super('div', props);
  }

  componentDidMount() {
    setTimeout(() => {
      const element = document.getElementById(this.props.id);
      const input = element as HTMLInputElement;

      if (this.props.disabled) {
        const element = document.getElementById(this.props.id);
        const input = element as HTMLInputElement;
        if (input) {
          input.disabled = true;
        }
      }

      if (this.props?.validate) {
        const message = validateTextInput(input.value, this.props.validate);
        input.setCustomValidity(message);
      }

      input.onblur = () => {
        visualizationOfvalidation(input);
      };

      input.onfocus = () => {
        visualizationOfvalidation(input, true);
      };

      input?.addEventListener('input', () => {
        if (this.props?.validate) {
          const message = validateTextInput(input.value, this.props.validate);
          input.setCustomValidity(message);
        }
      });
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}
