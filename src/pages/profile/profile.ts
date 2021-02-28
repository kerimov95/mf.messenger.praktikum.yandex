import {BackButtonComponent} from '../../components/backButton/backButton';
import {Block, IBlockProps} from '../../modules/block';
import {compile} from '../../utilities/templator';
import {template} from './profile.template';
import {AvatarComponent} from '../../components/avatar/avatar';
import {ItemInputComponent} from '../../components/itemInput/itemInput';
import {ButtonComponent} from '../../components/button/button';
import {ItemButtonComponent} from '../../components/itemButton/itemButton';
import {IProfile, ProfileApi} from '../../api/profile-api';
import {typeInput, validateForm} from '../../utilities/validate';
import {Router} from '../../modules/router/router';
import {Modal} from '../../components/modal/modal';
import {InputComponent} from '../../components/input/input';
import './profile.scss';

export interface IProfilePage extends IBlockProps {
  profile?: IProfile;
  backButton?: BackButtonComponent;
  isEdit?: boolean;
  avatar?: AvatarComponent;
  profileApi?: ProfileApi;
}

export class ProfilePage extends Block<IProfilePage> {
  private router = new Router();
  private modal: Modal<{file : File}>;

  constructor() {
    super('main', {
      profileApi: new ProfileApi(),
      backButton: new BackButtonComponent({
        link: '../chats',
      }),
      isEdit: false,
    });

    this.modal = new Modal('.app', [
      new InputComponent({
        id: 'file',
        label: 'Выбрать файл на компьюторе',
        type: 'file',
        display: 'none',
      }),
    ], [
      new ButtonComponent({
        id: 'save',
        className: 'btn btn-success mr-1',
        text: 'Сохранить',
        onClick: () =>{
          this.modal.hidden(false);
        },
      }),
      new ButtonComponent({
        id: 'cancel',
        className: 'btn btn-secondary',
        text: 'Отмена',
        onClick: () =>{
          this.modal.hidden(true);
        },
      }),
    ]);
  }

  getrl(url: string |undefined): string | undefined {
    if (url) {
      return 'https://ya-praktikum.tech' + url;
    } else {
      return undefined;
    };
  }

  async init() {
    const profile = await this.props.profileApi?.getUserInfo().then();
    this.props.profile = profile;
  }

  componentDidMount() {

  }

  render() {
    return compile(template, {
      backButton: this.props?.backButton?.render(),

      avatar: new AvatarComponent({
        id: 'avatar',
        imageUrl: this.getrl(this.props.profile?.avatar),
        name: this.props.profile?.display_name,
        onClick: async () =>{
          const data = await this.modal.show();
          if (data && data.file) {
            const formData = new FormData();
            formData.append('avatar', data.file, data.file.name);
            if (this.props.profileApi) {
              this.props.profileApi.changeAvatar(formData)
                  .then( async () => {
                    const profile = await this.props.profileApi?.getUserInfo();
                    this.setProps({
                      profile: profile,
                    });
                  });
            }
          }
        },
      }).render(),

      email: new ItemInputComponent({
        label: 'Почта',
        id: 'email',
        type: 'email',
        value: this.props?.profile?.email,
        disabled: !this.props.isEdit,
        validate: {type: typeInput.email, requred: true},
      }).render(),

      login: new ItemInputComponent({
        label: 'Логин',
        id: 'login',
        type: 'text',
        value: this.props?.profile?.login,
        disabled: !this.props.isEdit,
        validate: {requred: true},
      }).render(),

      first_name: new ItemInputComponent({
        label: 'Имя',
        id: 'first_name',
        type: 'text',
        value: this.props?.profile?.first_name,
        disabled: !this.props.isEdit,
        validate: {requred: true},
      }).render(),

      second_name: new ItemInputComponent({
        label: 'Фамилия',
        id: 'second_name',
        type: 'text',
        value: this.props?.profile?.second_name,
        disabled: !this.props.isEdit,
        validate: {requred: true},
      }).render(),

      display_name: new ItemInputComponent({
        label: 'Имя в чате',
        id: 'display_name',
        type: 'text',
        value: this.props?.profile?.display_name,
        disabled: !this.props.isEdit,
        validate: {requred: true},
      }).render(),

      phone: new ItemInputComponent({
        label: 'Телефон',
        id: 'phone',
        type: 'text',
        value: this.props?.profile?.phone,
        disabled: !this.props.isEdit,
        validate: {type: typeInput.phone, requred: true},
      }).render(),

      saveProfile: new ButtonComponent({
        display: this.props?.isEdit ? 'block' : 'none',
        className: 'mt-3 btn btn-success w-50',
        text: 'Сохранить',
        id: 'saveButton',
        onClick: () => {
          const element = document.getElementById('profileForm');
          const form = element as HTMLFormElement;
          const profile = validateForm<IProfile>(form);
          if (profile && this.props.profileApi) {
            this.props.profileApi.changeProfile(profile).then(async () => {
              const profile = await this.props.profileApi?.getUserInfo();
              this.setProps({
                profile: profile,
                isEdit: false,
              });
            });
          }
        },
      }).outerHTML(),

      editProfile: new ItemButtonComponent({
        id: 'editBtn',
        display: this.props?.isEdit ? 'none' : 'flex',
        text: 'Изменить данные',
        onClick: () => {
          this.setProps({
            isEdit: true,
          });
        },
      }).render(),

      editPassword: new ItemButtonComponent({
        id: 'editPass',
        display: this.props?.isEdit ? 'none' : 'flex',
        text: 'Изменить пароль',
        onClick: () => {
          this.router.go('/editpassword');
        },
      }).render(),

      ExitButton: new ItemButtonComponent({
        id: 'ExitBtn',
        display: this.props?.isEdit ? 'none' : 'flex',
        text: 'Выйти',
        className: 'text-danger',
        onClick: async () => {
          if (this.props.profileApi) {
            await this.props.profileApi.logout()
                .then((status) => {
                  if (status.code === 200) {
                    this.router.go('/');
                  }
                });
          }
        },

      }).render(),
    });
  }
}
