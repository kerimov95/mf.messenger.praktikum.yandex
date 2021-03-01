import {Block, IBlockProps} from 'modules/block';

export interface IButton extends IBlockProps {
  id: string;
  display?: string;
  onClick?: (event: any) => any;
}

export class ButtonComponent extends Block<IButton> {
  constructor(props: IButton) {
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

  render(): string | undefined {
    return this.props.text;
  }
}
