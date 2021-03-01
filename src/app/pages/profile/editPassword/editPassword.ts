import {Block, IBlockProps} from 'modules/block';
import {Router} from 'modules/router/router';
import {BackButtonComponent} from 'components/backButton/backButton';
import {ItemInputComponent} from 'components/itemInput/itemInput';
import {ButtonComponent} from 'components/button/button';
import {validateForm} from 'utilities/validate';
import {compile} from 'utilities/templator';
import {ProfileApi, IPassword} from 'api/profile-api';
import {template} from './editPassword.template';

interface IEditPasswordPage extends IBlockProps {
  backButton: BackButtonComponent;
  oldPassword: ItemInputComponent;
  newPassword: ItemInputComponent;
  confirmNewPassword: ItemInputComponent;
  saveButton: ButtonComponent;
}

export class EditPasswordPage extends Block<IEditPasswordPage> {
    private router = new Router();
    private profileApi = new ProfileApi();

    constructor() {
      super('main', {
        backButton: new BackButtonComponent({
          link: '/profile',
        }),

        oldPassword: new ItemInputComponent({
          type: 'password',
          id: 'oldPassword',
          label: 'Старый пароль',
          autocomplete: true,
          validate: {requred: true},
        }),

        newPassword: new ItemInputComponent({
          type: 'password',
          id: 'newPassword',
          label: ' Новый пароль',
          autocomplete: true,
          validate: {requred: true},
        }),

        confirmNewPassword:
                new ItemInputComponent({
                  type: 'password',
                  id: 'confirmNewPassword',
                  label: 'Повторите новый пароль',
                  autocomplete: true,
                  validate: {requred: true},
                }),

        saveButton: new ButtonComponent({
          id: 'saveBtn',
          className: 'mt-3 btn btn-success w-50',
          text: 'Сохранить',
          onClick: async () => {
            const element = document.getElementById('passwordForm');
            const form = element as HTMLFormElement;
            const validForm = validateForm<IPassword>(form);

            if (validForm) {
              const status = await this.profileApi.changePassword(validForm);

              switch (status.code) {
                case 200:
                  this.router.back();
                  break;
                case 400:
                  alert('Неверно указан старый пароль');
                  break;
                default:
                  alert('Error');
                  break;
              }
            }
          },
        }),
      });
    }

    render(): string {
      return compile(template, {
        backButton: this.props.backButton.render(),
        oldPassword: this.props.oldPassword.render(),
        newPassword: this.props.newPassword.render(),
        confirmNewPassword: this.props.confirmNewPassword.render(),
        saveButton: this.props.saveButton.outerHTML(),
      });
    }
}
