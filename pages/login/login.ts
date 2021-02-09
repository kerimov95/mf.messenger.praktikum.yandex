import { ButtonComponent } from "../../components/button/button.js";
import { InputComponent } from "../../components/input/input.js";
import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from './login.template.js'

export class LoginPage extends Block {

    constructor() {
        super('main', {
            title: 'Авторизация',
            login: new InputComponent({
                text: 'Логин',
                name: 'login',
                type: 'text',
                autocomplete: false
            }),
            password: new InputComponent({
                text: 'Пароль',
                name: 'password',
                type: 'password',
                autocomplete: true
            }),
            button: new ButtonComponent({
                className: 'w-75 btn btn-success',
                text: 'Авторизоваться',
                onclick: 'consoleOutput(user)'
            })
        })
    }

    render(): string {
        return compile(template, {
            title: this.props.title,
            login: this.props.login.render(),
            password: this.props.password.render(),
            button: this.props.button.render()
        })
    }
}