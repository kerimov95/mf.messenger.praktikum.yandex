import { Block } from '../../modules/block'
import { template } from './error.template'
import { compile } from '../../utilities/templator'

interface IErrorPage {
    code: number;
    message: string;
}

export class ErrorPage extends Block<IErrorPage> {

    constructor(props: IErrorPage = { code: 404, message: 'Страница не найдена' }) {
        super('div', props)
    }

    render(): string {
        return compile(template, this.props);
    }
}

