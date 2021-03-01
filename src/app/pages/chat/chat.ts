import {ButtonComponent} from 'components/button/button';
import {Block, IBlockProps} from 'modules/block';
import {compile} from 'utilities/templator';
import {ChatList} from 'components/chatlist/chatlist';
import {ChatApi, IChat} from 'api/chat-api';
import {ItemButtonComponent} from 'components/itemButton/itemButton';
import {Modal} from 'components/modal/modal';
import {InputComponent} from 'components/input/input';
import {UsersApi} from 'api/user-api';
import {UsersModal} from 'components/users/users';
import {IProfile, ProfileApi} from 'api/profile-api';
import {WebSocketService} from 'modules/webSocketService';
import {IconButtonComponent} from 'components/iconButton/iconButton';
import {template} from './chat.template';
import './chat.scss';

interface IMessage {
  /* eslint-disable camelcase */
  user_id: number;
  chat_id?: number;
  content: string;
  time: string;
  id: number;
  name: string;
  class : string;
}

interface IChatPage extends IBlockProps {
  currentChat?: { id: number, title: string },
  chatList?: ChatList,
  createChatButton?: ButtonComponent,
  settingButton?: ButtonComponent,
  addUserButton?: ItemButtonComponent,
  removeUserButton?: ItemButtonComponent,
  editAvatar?: ItemButtonComponent,
  deleteChatButton?: ItemButtonComponent,
  iconBtn?: IconButtonComponent,
  chats?: IChat[];
  messages?: IMessage[];
}

export class ChatPage extends Block<IChatPage> {
  chatApi: ChatApi;
  chatList: ChatList;
  modalChat: Modal<{ name: string }>;
  modalFindLogin: Modal<{ login: string }>;
  modalAvatar: Modal<{ file: File }>
  usersModal: UsersModal;
  usersApi: UsersApi;
  currentUser: IProfile;
  currentWs?: WebSocketService;

  constructor() {
    super('main', {
      messages: [],
    });

    this.chatApi = new ChatApi();
    this.usersApi = new UsersApi();

    this.modalAvatar = new Modal('.app', [
      new InputComponent({
        id: 'file',
        label: 'Выбрать файл на компьюторе',
        type: 'file',
        display: 'none',
      }),
    ], [
      new ButtonComponent({
        id: 'saveAvatar',
        className: 'btn btn-success mr-1',
        text: 'Сохранить',
        onClick: () => {
          this.modalAvatar.hidden(false);
        },
      }),
      new ButtonComponent({
        id: 'cancelAvatar',
        className: 'btn btn-secondary',
        text: 'Отмена',
        onClick: () => {
          this.modalAvatar.hidden(true);
        },
      }),
    ]);
    this.modalChat = new Modal('.app', [
      new InputComponent({
        id: 'name',
        label: 'Имя',
      }),
    ], [
      new ButtonComponent({
        id: 'saveChat',
        className: 'btn btn-success mr-1',
        text: 'Сохранить',
        onClick: () => {
          this.modalChat.hidden(false);
        },
      }),
      new ButtonComponent({
        id: 'closeChat',
        className: 'btn btn-secondary',
        text: 'Закрыть',
        onClick: () => {
          this.modalChat.hidden(true);
        },
      }),
    ],
    );
    this.modalFindLogin = new Modal('.app', [
      new InputComponent({
        id: 'login',
        label: 'Логин',
      }),
    ], [
      new ButtonComponent({
        id: 'findLogin',
        className: 'btn btn-success mr-1',
        text: 'Найти',
        onClick: () => {
          this.modalFindLogin.hidden(false);
        },
      }),
      new ButtonComponent({
        id: 'closeFindLogin',
        className: 'btn btn-secondary',
        text: 'Отмена',
        onClick: () => {
          this.modalFindLogin.hidden(true);
        },
      }),
    ],
    );
  }

  async init() {
    const profile = new ProfileApi();
    const user = await profile.getUserInfo().then();
    this.currentUser = user;

    const chats = await this.chatApi.getChats().then();
    this.props.chats = chats;
  }

  private addUser(users : number[], chatId :number) {
    this.chatApi.addUsersToChat(users, chatId)
        .then((res) => {
          if (res.code === 200) {
            if (users?.length === 1) {
              alert('Пользователь успешно добавлен');
            } else {
              alert('Пользователи успешно добавлены');
            }
          }
        });
  }

  private deleteUser(users: number[], chatId: number ) {
    this.chatApi.deleteUsersFromChat(users, chatId)
        .then(() => {
          if (users?.length === 1) {
            alert('Пользователь успешно удален');
          } else {
            alert('Пользователи успешно удалены');
          }
        });
  }

  async componentDidMount(): Promise<void> {
    setTimeout(() => {
      if (this.props.currentChat) {
        const chatBar = document.getElementById('chatBar');
        const div = chatBar as HTMLDivElement;
        div.style.display = 'flex';
      }
    });
    setTimeout(() => {
      this.props.chats?.forEach((chat) => {
        const ul = document.getElementById(chat.id.toString());
        (ul as HTMLLIElement).addEventListener('click', async () => {
          this.props.messages = [];
          const userId = this.currentUser.id;
          const token = await this.chatApi.getChatToken(chat.id);
          const ws = new WebSocketService(userId, chat.id, token);

          ws.subscribe('open', () =>{
            ws.send({content: '0', type: 'get old'});
          });

          ws.subscribe('message', async (event: any) => {
            const content = JSON.parse(event.data);
            if (Array.isArray(content)) {
              this.props.messages?.push(...content);
            } else {
              if (content.type === 'message') {
                this.props.messages?.unshift(
                    {
                      chat_id: this.props.currentChat?.id,
                      user_id: content.userId,
                      content: content.content,
                      time: content.time,
                      id: content.id,
                      name: '',
                      class: '',
                    },
                );
              }
            };

            if (this.props.messages) {
              for (let i = 0; i < this.props.messages.length; i++) {
                const message = this.props.messages[i];
                if (message.user_id === this.currentUser.id) {
                  this.props.messages[i].name = 'Вы';
                  this.props.messages[i].class = 'left';
                } else {
                  const user = await this.usersApi.getUserById(message.user_id);
                  this.props.messages[i].name = user.login;
                  this.props.messages[i].class = 'right';
                }
              }
            }

            this.setProps({
              messages: this.props.messages,
              currentChat: {id: chat.id, title: chat.title},
            });
          });
          this.currentWs = ws;
        });
      });
    });
  }

  render(): string {
    return compile(template, {
      messages: this.props.messages,
      chatList: new ChatList({chats: this.props.chats}).render(),
      createChatButton: new ButtonComponent({
        id: 'btnCreate',
        className: 'btn btn-success m-1',
        text: 'Добавить',
        onClick: async () => {
          const chatName = await this.modalChat.show();
          if (chatName) {
            this.chatApi.createChat(chatName.name)
                .then(async () => {
                  const chats = await this.chatApi.getChats();
                  this.setProps({
                    chats: chats,
                  });
                });
          }
        },
      }).outerHTML(),

      settingButton: new ButtonComponent({
        id: 'settingUser',
        text: 'Настройки',
        className: 'btn btn-link',
      }).outerHTML(),

      editAvatar: new ItemButtonComponent({
        id: 'editAvatar',
        text: 'Изменить аватар',
        onClick: async () => {
          const data = await this.modalAvatar.show();
          if (data && this.props.currentChat?.id) {
            const formData = new FormData();
            formData.append('chatId', this.props.currentChat?.id.toString());
            formData.append('avatar', data.file, data.file.name);
            const chatApi = new ChatApi();
            chatApi.changeAvatar(formData).then(async () => {
              const chats = await this.chatApi.getChats().then();
              this.setProps({
                chats: chats,
              });
            });
          }
        },
      }).render(),

      addUserButton: new ItemButtonComponent({
        id: 'addUser',
        text: 'Добавить пользователя',
        onClick: async () => {
          const data = await this.modalFindLogin.show();
          if (data) {
            const users = await this.usersApi.searchUser({login: data.login});
            if (users.length > 0) {
              this.usersModal = new UsersModal('.app', users, 'Добавить');
              const usersId = await this.usersModal.show();
              if (usersId && usersId.length > 0 && this.props.currentChat) {
                this.addUser(usersId, this.props.currentChat.id);
              }
            } else {
              alert('Пользователь с таким логином не найден');
            };
          }
        },
      }).render(),

      removeUserButton: new ItemButtonComponent({
        id: 'removeUser',
        className: 'text-danger',
        text: 'Удалить пользователя',
        onClick: async () => {
          const chatId = this.props.currentChat?.id;
          if (chatId) {
            const users = await this.chatApi.getChatUsers(chatId);
            this.usersModal = new UsersModal('.app', users, 'Удалить');
            const usersId = await this.usersModal.show();
            if (usersId && usersId.length > 0) {
              this.deleteUser(usersId, chatId);
            }
          }
        },
      }).render(),

      deleteChatButton: new ItemButtonComponent({
        id: 'removeChat',
        className: 'text-danger',
        text: 'Удалить чат',
        onClick: async () => {
          const chatId = this.props.currentChat?.id;
          if (chatId) {
            await this.chatApi.deleteChat(chatId).then(() =>{
              this.setProps({
                currentChat: undefined,
              });
              const chats = this.props.chats?.filter((c) => c.id !== chatId);
              this.setProps({
                chats: chats,
              });
              alert('Чат удален');
            });
          }
        },
      }).render(),

      iconBtn: new IconButtonComponent({
        id: 'sendBtn',
        icon: 'fa fa-arrow-right',
        onClick: () => {
          if (this.currentWs?.check()) {
            const element = document.getElementById('message');
            const message = element as HTMLInputElement;
            if (message && message.value) {
              this.currentWs.send({content: message.value, type: 'message'});
            }
          }
        },
      }).render(),
      currentChat: this.props.currentChat,
    });
  }
}
