import { compile } from "../../utilities/templator";
import { InputComponent, Iinput } from "../input/input";
import { template } from "./itemInput.template";


export class ItemInputComponent extends InputComponent {
    constructor(props: Iinput) {
        super(props);
    }


    render(): string {
        return compile(template, this.props)
    }
}