import {Block, IBlockProps} from 'modules/block';
import {compile} from 'utilities/templator';
import {validateTextInput, IValidateInput,
  visualizationOfvalidation} from 'utilities/validate';
import {template} from './input.template';

export interface Iinput extends IBlockProps {
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
    display? : string;
}

export class InputComponent extends Block<Iinput> {
  constructor(props: Iinput) {
    super('div', props);
  }

  componentDidMount() {
    setTimeout(() => {
      const element = document.getElementById(this.props.id);
      const input = element as HTMLInputElement;

      if (input) {
        if (this.props.disabled) {
          input.disabled = true;
        }
        if (this.props.display) {
          input.style.display = this.props.display;
        };
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
