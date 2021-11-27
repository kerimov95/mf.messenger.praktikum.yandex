import {Block} from 'modules/block';
import {compile} from 'utilities/templator';
import {IButton} from 'components/button/button';
import {template} from './itemButton.template';
import './itemButton.scss';

export class ItemButtonComponent extends Block<IButton> {
  constructor(props: IButton) {
    super('div', props);
  }

  componentDidMount() {
    setTimeout(() => {
      const button = document.getElementById(this.props.id);

      if (typeof this.props.onClick === 'function') {
        button?.addEventListener('click', this.props.onClick);
      }
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}
