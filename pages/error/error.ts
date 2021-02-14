import { Block } from '../../modules/block.js'
import { template } from './error.templa.js'
import { compile } from '../../utilities/templator.js'
import { render } from '../../modules/render.js';

export class ErrorPage extends Block {

    constructor(props: any) {
        super('div', props)
    }

    render(): string {
        return compile(template, this.props);
    }
}

let errorPage = new ErrorPage({
    code: '404',
    message: 'Страница не найдена'
})

render('.root', errorPage)

