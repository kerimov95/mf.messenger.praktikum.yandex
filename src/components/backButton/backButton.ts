import {Block} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './backButton.template';

export interface IBackButton {
    link?: string;
}

export class BackButtonComponent extends Block {
  constructor(props: IBackButton) {
    super('div', props);
  }

  render(): string {
    return compile(template, this.props);
  }
}
