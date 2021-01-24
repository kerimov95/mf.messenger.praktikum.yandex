import { Block } from "../../utilities/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./avatar.template.js";
export class AvatarComponent extends Block {
    constructor(props) {
        super('div', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=avatar.js.map