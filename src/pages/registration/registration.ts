import { IProfile, ProfileApi } from "../../api/profile-api";
import { ButtonComponent } from "../../components/button/button";
import { InputComponent } from "../../components/input/input";
import { Block } from "../../modules/block";
import { Router } from "../../modules/router/router";
import { compile } from "../../utilities/templator";
import { typeInput, ValidateForm } from "../../utilities/validate";
import { template } from './registration.template';

export class RegistrationPage extends Block {

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
                validate: { requred: true, type: typeInput.email }
            }),
            login: new InputComponent({
                label: 'Логин',
                id: 'login',
                name: 'login',
                type: 'text',
                autocomplete: false,
                validate: { requred: true }
            }),
            first_name: new InputComponent({
                label: 'Имя',
                id: 'first_name',
                name: 'first_name',
                type: 'text',
                autocomplete: false,
                validate: { requred: true }
            }),
            second_name: new InputComponent({
                label: 'Фамилия',
                id: 'second_name',
                name: 'second_name',
                type: 'text',
                autocomplete: false,
                validate: { requred: true }
            }),
            phone: new InputComponent({
                label: 'Телефон',
                id: 'phone',
                name: 'phone',
                type: 'text',
                autocomplete: false,
                validate: { requred: true, type: typeInput.phone }
            }),
            password: new InputComponent({
                label: 'Пароль',
                id: 'password',
                name: 'password',
                type: 'password',
                autocomplete: true,
                validate: { requred: true }
            }),
            password_confirm: new InputComponent({
                label: 'Пароль (еще раз)',
                id: 'password_confirm',
                name: 'password_confirm',
                type: 'password',
                autocomplete: true,
                validate: { requred: true }
            }),
            button: new ButtonComponent({
                id: 'authBtn',
                className: 'w-75 btn btn-success',
                text: 'Авторизоваться',
                onClick: async () => {
                    const userForm = document.getElementById('userForm') as HTMLFormElement;
                    const validForm = ValidateForm<IProfile>(userForm);
                    if (validForm) {
                        await this.profieApi.Signup(validForm)
                            .then(result => {
                                switch (result.code) {
                                    case 200:
                                        this.router.go('/chat')
                                        break;
                                    case 400:
                                        alert('Ползователь уже существует')
                                        break;
                                    default:
                                        alert('Error')
                                        break;
                                }
                            })
                    }
                }
            })
        });

    }

    componentDidMount() {

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
            button: this.props.button.render()
        })
    }
}