import { IUser, ProfileApi } from "../../api/profile-api.js";
import { ButtonComponent } from "../../components/button/button.js";
import { InputComponent } from "../../components/input/input.js";
import { Block } from "../../modules/block.js";
import { Router } from "../../modules/router/router.js";
import { compile } from "../../utilities/templator.js";
import { ValidateForm } from "../../utilities/validate.js";
import { template } from './login.template.js';

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
                validate: { requred: true }
            }),
            password: new InputComponent({
                id: 'password',
                name: 'password',
                type: 'password',
                label: 'Пароль',
                autocomplete: true,
                validate: { requred: true }
            })
        })
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
                    const user = ValidateForm<IUser>(document.forms[0]);
                    if (user) {
                        let userApi = new ProfileApi();
                        let status = await userApi.SignIn(user)
                        console.log(status)
                        switch (status.code) {
                            case 200:
                                this.router.go('/chat');
                                break;
                            case 400:
                                this.router.go('/chat');
                                break;
                            case 401:
                                alert("Неверный логин или пароль")
                                break;
                            default:
                                alert("Error")
                                break;
                        }
                    }
                }
            }).render()
        })
    }
}