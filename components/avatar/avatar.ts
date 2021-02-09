import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./avatar.template.js";

export interface IAvatar {
    id?: string;
    name?: string;
}

export class AvatarComponent extends Block {
    constructor(props: IAvatar) {
        super('div', props)
    }

    render(): string {
        return compile(template, this.props);
    }
}