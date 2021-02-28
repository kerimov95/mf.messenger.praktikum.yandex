import {Block} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {IButton} from '../button/button';
import {template} from './iconButton.template';

interface IIconButton extends IButton{
    icon? : string
}

export class IconButtonComponent extends Block<IIconButton> {
  constructor(props: IIconButton) {
    super('button', props);
  }

  componentDidMount() {
    setTimeout(() => {
      const button = document.getElementById(this.props.id);
      if (button && this.props.display) {
        button.style.display = this.props.display;
      }

      if (typeof this.props.onClick === 'function') {
        button?.addEventListener('click', this.props.onClick);
      }
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}
