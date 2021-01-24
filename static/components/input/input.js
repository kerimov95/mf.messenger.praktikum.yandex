import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from './input.template.js';
export class InputComponent extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=input.js.map