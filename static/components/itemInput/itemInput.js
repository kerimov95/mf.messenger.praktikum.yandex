import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./ItemInput.template.js";
export class ItemInputComponent extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=itemInput.js.map