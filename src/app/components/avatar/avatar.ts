import {Block, IBlockProps} from 'modules/block';
import {compile} from 'utilities/templator';
import {template} from './avatar.template';
import './avatar.scss';

export interface IAvatarBlock extends IBlockProps {
    id?: string;
    name?: string;
    imageUrl?: string;
    onClick?: () => void
}

export class AvatarComponent extends Block<IAvatarBlock> {
  constructor(props: IAvatarBlock) {
    super('div', props);
  }

  componentDidMount() {
    if (!this.props.imageUrl) {
      this.props.imageUrl = 'https://vitamedrf.ru/upload/iblock/730/7305b4e50439dd7a254adea0c232c2fd.jpg';
    };

    setTimeout(() =>{
      if (this.props.id) {
        const avatar = document.getElementById(this.props.id);

        if (typeof this.props.onClick === 'function') {
          avatar?.addEventListener('click', this.props.onClick);
        }
      }
    });
  }

  render( url: string | undefined = undefined ): string {
    if (url) {
      this.props.imageUrl = url;
    };
    return compile(template, this.props);
  }
}
