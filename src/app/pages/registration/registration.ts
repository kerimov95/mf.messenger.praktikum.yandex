import {IProfile, ProfileApi} from 'api/profile-api';
import {ButtonComponent} from 'components/button/button';
import {InputComponent} from 'components/input/input';
import {Block, IBlockProps} from 'modules/block';
import {Router} from 'modules/router/router';
import {compile} from 'utilities/templator';
import {typeInput, validateForm} from 'utilities/validate';
import {template} from './registration.template';
import './registration.scss';

interface IRegistrationPage extends IBlockProps{
  title: string;
  email: InputComponent;
  login: InputComponent;
  phone: InputComponent;
  password: InputComponent;
  button: ButtonComponent;
  /* eslint-disable camelcase */
  first_name: InputComponent;
  second_name: InputComponent;
  password_confirm: InputComponent;
}

export class RegistrationPage extends Block<IRegistrationPage> {
    private profieApi = new ProfileApi();
    private router = new Router();

    constructor() {
      super('main', {
        title: 'Регистрация',
        email: new InputComponent({
          label: 'Почта',
          id: 'email',
          name: 'email',
          type: 'email',
          autocomplete: false,
          validate: {requred: true, type: typeInput.email},
        }),
        login: new InputComponent({
          label: 'Логин',
          id: 'login',
          name: 'login',
          type: 'text',
          autocomplete: false,
          validate: {requred: true},
        }),
        first_name: new InputComponent({
          label: 'Имя',
          id: 'first_name',
          name: 'first_name',
          type: 'text',
          autocomplete: false,
          validate: {requred: true},
        }),
        second_name: new InputComponent({
          label: 'Фамилия',
          id: 'second_name',
          name: 'second_name',
          type: 'text',
          autocomplete: false,
          validate: {requred: true},
        }),
        phone: new InputComponent({
          label: 'Телефон',
          id: 'phone',
          name: 'phone',
          type: 'text',
          autocomplete: false,
          validate: {requred: true, type: typeInput.phone},
        }),
        password: new InputComponent({
          label: 'Пароль',
          id: 'password',
          name: 'password',
          type: 'password',
          autocomplete: true,
          validate: {requred: true},
        }),
        password_confirm: new InputComponent({
          label: 'Пароль (еще раз)',
          id: 'password_confirm',
          name: 'password_confirm',
          type: 'password',
          autocomplete: true,
          validate: {requred: true},
        }),
        button: new ButtonComponent({
          id: 'authBtn',
          className: 'w-75 btn btn-success',
          text: 'Авторизоваться',
          onClick: async () => {
            const element = document.getElementById('userForm');
            const userForm = element as HTMLFormElement;
            const validForm = validateForm<IProfile>(userForm);
            if (validForm) {
              try {
                await this.profieApi.signup(validForm)
                    .then((result) => {
                      switch (result.code) {
                        case 200:
                          this.router.go('/chats');
                          break;
                        case 400:
                          alert('Ползователь уже существует');
                          break;
                        default:
                          alert('Error');
                          break;
                      }
                    });
              } catch (ex) {
                console.log(ex);
              }
            }
          },
        }),
      });
    }

    render() {
      return compile(template, {
        title: this.props.title,
        email: this.props.email.render(),
        login: this.props.login.render(),
        first_name: this.props.first_name.render(),
        second_name: this.props.second_name.render(),
        phone: this.props.phone.render(),
        password: this.props.password.render(),
        password_confirm: this.props.password_confirm.render(),
        button: this.props.button.outerHTML(),
      });
    }
}
