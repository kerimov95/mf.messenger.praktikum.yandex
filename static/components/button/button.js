import { Block } from '../../utilities/block.js';
import { compile } from '../../utilities/templator.js';
import { template } from './button.temp.js';
export class ButtonComponent extends Block {
    constructor(props) {
        super('button', props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=button.js.map