import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from './input.template.js';
import { ValidateTextInput, IValidateInput, visualizationOfvalidation } from '../../utilities/validate.js'

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
        super('div', props)
    }

    componentDidMount() {
        setTimeout(() => {

            const input = (document.getElementById(this.props.id) as HTMLInputElement)

            if (this.props.disabled) {
                let input = document.getElementById(this.props.id) as HTMLInputElement
                if (input) {
                    input.disabled = true;
                }
            }

            if (this.props?.validate) {
                const message = ValidateTextInput(input.value, this.props.validate);
                input.setCustomValidity(message);
            }

            input.onblur = () => {
                visualizationOfvalidation(input)
            }

            input.onfocus = () => {
                visualizationOfvalidation(input, true);
            }

            input?.addEventListener('input', () => {
                if (this.props?.validate) {
                    const message = ValidateTextInput(input.value, this.props.validate);
                    input.setCustomValidity(message);
                }
            });
        });
    }

    render(): string {
        return compile(template, this.props)
    }
}