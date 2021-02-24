import {IUser, ProfileApi} from '../../api/profile-api';
import {ButtonComponent} from '../../components/button/button';
import {InputComponent} from '../../components/input/input';
import {Block} from '../../modules/block';
import {Router} from '../../modules/router/router';
import {compile} from '../../utilities/templator';
import {validateForm} from '../../utilities/validate';
import {template} from './login.template';
import './login.scss';

export class LoginPage extends Block {
    private router = new Router();

    constructor() {
      super('main', {
        title: 'Авторизация',
        login: new InputComponent({
          id: 'login',
          name: 'login',
          type: 'text',
          label: 'Логин',
          autocomplete: false,
          validate: {requred: true},
        }),
        password: new InputComponent({
          id: 'password',
          name: 'password',
          type: 'password',
          label: 'Пароль',
          autocomplete: true,
          validate: {requred: true},
        }),
      });
    }

    render(): string {
      return compile(template, {
        title: this.props.title,
        login: this.props.login.render(),
        password: this.props.password.render(),
        button: new ButtonComponent({
          id: 'btn-ok',
          className: 'w-75 btn btn-success',
          text: 'Авторизоваться',
          onClick: async () => {
            const user = validateForm<IUser>(document.forms[0]);
            if (user) {
              const userApi = new ProfileApi();
              const status = await userApi.signIn(user);
              switch (status.code) {
                case 200:
                  this.router.go('/chat');
                  break;
                case 400:
                  this.router.go('/chat');
                  break;
                case 401:
                  alert('Неверный логин или пароль');
                  break;
                default:
                  alert('Error');
                  break;
              }
            }
          },
        }).render(),
      });
    }
}
