import { compile } from "../../utilities/templator.js";
import { InputComponent, Iinput } from "../input/input.js";
import { template } from "./itemInput.template.js";


export class ItemInputComponent extends InputComponent {
    constructor(props: Iinput) {
        super(props);
    }


    render(): string {
        return compile(template, this.props)
    }
}