import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./itemButton.template.js";
import { IButton } from "../button/button"


export class ItemButtonComponent extends Block {
    constructor(props: IButton) {
        super('div', props)
    }


    render(): string {
        return compile(template, this.props)
    }
}