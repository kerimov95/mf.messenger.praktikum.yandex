import { ButtonComponent } from "../../components/button/button.js";
import { InputComponent } from "../../components/input/input.js";
import { Block } from "../../utilities/block.js";
import { render } from "../../utilities/render.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./registration.template.js";

export class RegistrationPage extends Block {
    constructor() {
        super('main', {
            title: 'Регистрация',
            email: new InputComponent({
                text: 'Почта',
                name: 'email',
                type: 'email',
                autocomplete: false
            }),
            login: new InputComponent({
                text: 'Логин',
                name: 'login',
                type: 'text',
                autocomplete: false
            }),
            first_name: new InputComponent({
                text: 'Имя',
                name: 'first_name',
                type: 'text',
                autocomplete: false
            }),
            second_name: new InputComponent({
                text: 'Фамилия',
                name: 'second_name',
                type: 'text',
                autocomplete: false
            }),
            phone: new InputComponent({
                text: 'Телефон',
                name: 'phone',
                type: 'text',
                autocomplete: false
            }),
            password: new InputComponent({
                text: 'Пароль',
                name: 'password',
                type: 'password',
                autocomplete: true
            }),
            password_confirm: new InputComponent({
                text: 'Пароль (еще раз)',
                name: 'password_confirm',
                type: 'password',
                autocomplete: true
            }),
            button: new ButtonComponent({
                className: 'w-75 btn btn-success',
                text: 'Авторизоваться',
                onclick: 'consoleOutput(userForm)'
            })
        })
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

let registrationPage = new RegistrationPage();

render('.root', registrationPage)