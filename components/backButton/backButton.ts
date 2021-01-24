import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./backButton.template.js";

export interface IBackButton {
    link?: string;
}

export class backButtonComponent extends Block {
    constructor(props: IBackButton) {
        super('div', props)
    }

    render(): string {
        return compile(template, this.props)
    }
}