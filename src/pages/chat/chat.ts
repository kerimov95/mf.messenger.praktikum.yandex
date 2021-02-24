import {IChat, ChatApi} from '../../api/chat-api';
import {ButtonComponent} from '../../components/button/button';
import {Block} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './chat.template';
import './chat.scss';

export interface IChatPage {
  chats?: IChat[],
  createChatButton?: ButtonComponent,
  addUserButton?: ButtonComponent,
  removeUserButton?: ButtonComponent,
  currentChat?: { id: number, title: string }
}

export class ChatPage extends Block<IChatPage> {
  private chatApi: ChatApi;

  constructor() {
    super('main', {
      chats: [],
    });

    this.chatApi = new ChatApi();
  }

  componentDidMount(): void {
    const chatApi = new ChatApi();
    chatApi.getChats().then((chats) => {
      this.setProps({
        chats: chats,
      });
    });

    setTimeout(() => {
      this.props.chats?.forEach((chat) => {
        const ul = document.getElementById(chat.id.toString());

        (ul as HTMLLIElement).addEventListener('click', () => {
          this.setProps({
            currentChat: {id: chat.id, title: chat.title},
          });
        });
      });
    });
  }

  render(): string {
    return compile(template, {
      addUserButton: new ButtonComponent({
        id: 'addUser',
        text: 'Добавить пользователя',
        className: 'btn btn-success',
      }).render(),
      removeUserButton: new ButtonComponent({
        id: 'removeUser',
        text: 'Удалить пользователя',
        className: 'btn btn-danger',
      }).render(),
      currentChat: this.props.currentChat,
      chats: this.props.chats,
      createChatButton: new ButtonComponent({
        id: 'btnCreate',
        className: 'btn btn-success m-1',
        text: 'Новый чат',
        onClick: () => {
          this.chatApi.createChat('new Chat')
              .then((res) => {
                if (res.code === 200) {
                  this.componentDidMount();
                }
              });
        },
      }).render(),
    });
  }
}
