import {Block, IBlockProps} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './backButton.template';

export interface IBackButton extends IBlockProps {
  link?: string;
}

export class BackButtonComponent extends Block<IBackButton> {
  constructor(props: IBackButton) {
    super('div', props);
  }

  render(): string {
    return compile(template, this.props);
  }
}
