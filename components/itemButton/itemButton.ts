import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./itemButton.template.js";
import { IButton } from "../button/button"


export class ItemButtonComponent extends Block<IButton> {
    constructor(props: IButton) {
        super('div', props)
    }

    componentDidMount() {
        setTimeout(() => {
            const button = document.getElementById(this.props.id)

            if (typeof this.props.onClick === 'function') {
                button?.addEventListener('click', this.props.onClick)
            }
        });
    }

    render(): string {
        return compile(template, this.props)
    }
}