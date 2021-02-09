import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from './input.template.js'

export interface Iinput {
    text?: string;
    name?: string;
    type?: string;
    autocomplete?: boolean
    className?: string
}

export class InputComponent extends Block {
    constructor(props: Iinput) {
        super('div', props)
    }

    render(): string {
        return compile(template, this.props)
    }
}