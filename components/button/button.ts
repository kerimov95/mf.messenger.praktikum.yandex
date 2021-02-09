import { Block } from '../../modules/block.js'
import { compile } from '../../utilities/templator.js'
import { template } from './button.temp.js'

export interface IButton {
    id?: string;
    className?: string;
    text?: string;
    onclick?: string;
    display?: string;
}

export class ButtonComponent extends Block {
    constructor(props: IButton) {
        super('button', props);
    }

    render(): string {
        return compile(template, this.props);
    }
}