import {IChat} from '../../api/chat-api';
import {Block, IBlockProps} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './chatlist.template';
import './chatlist.scss';

interface IChatList extends IBlockProps {
  chats?: IChat[]
}

export class ChatList extends Block<IChatList> {
  constructor(chats: IChatList) {
    super('div', chats);
  }

  render() {
    return compile(template, {
      chats: this.props.chats,
    });
  }
}
