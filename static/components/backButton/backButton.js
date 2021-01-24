import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./backButton.template.js";
export class backButtonComponent extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=backButton.js.map