import {Block, IBlockProps} from 'modules/block';
import {compile} from 'utilities/templator';
import {template} from './error.template';

interface IErrorPage extends IBlockProps {
    code: number;
    message: string;
}

export class ErrorPage extends Block<IErrorPage> {
  constructor(props: IErrorPage = {code: 404, message: 'Страница не найдена'}) {
    super('div', props);
  }

  render(): string {
    return compile(template, this.props);
  }
}

