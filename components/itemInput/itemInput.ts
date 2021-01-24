import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./ItemInput.template.js";

export interface IItemInput {
    type?: string;
    value?: string;
    id?: string;
    label?: string;
    disabled?: string;
    autocomplete?: boolean;
}

export class ItemInputComponent extends Block {
    constructor(props: IItemInput) {
        super('div', props);
    }

    render(): string {
        return compile(template, this.props)
    }
}