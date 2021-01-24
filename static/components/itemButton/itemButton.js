import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./itemButton.template.js";
export class ItemButtonComponent extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=itemButton.js.map