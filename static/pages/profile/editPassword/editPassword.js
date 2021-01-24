import { Block } from "../../../utilities/block.js";
import { render } from "../../../utilities/render.js";
import { compile } from "../../../utilities/templator.js";
import { template } from './editPassword.template.js';
import { AvatarComponent } from '../../../components/avatar/avatar.js';
import { backButtonComponent } from '../../../components/backButton/backButton.js';
import { ItemInputComponent } from '../../../components/itemInput/itemInput.js';
import { ButtonComponent } from '../../../components/button/button.js';
export class EditPasswordPage extends Block {
    constructor() {
        super('main', {
            avatar: new AvatarComponent({
                id: 'avatar',
                name: 'Ali'
            }),
            backButton: new backButtonComponent({
                link: '../'
            }),
            oldPassword: new ItemInputComponent({
                type: 'password',
                id: 'oldPassword',
                label: 'Старый пароль',
                autocomplete: true,
            }),
            newPassword: new ItemInputComponent({
                type: 'password',
                id: 'newPassword',
                label: ' Новый пароль',
                autocomplete: true,
            }),
            confirmNewPassword: new ItemInputComponent({
                type: 'password',
                id: 'confirmNewPassword',
                label: 'Повторите новый пароль',
                autocomplete: true,
            }),
            saveButton: new ButtonComponent({
                onclick: 'consoleOutput(profileForm)',
                className: 'mt-3 btn btn-success w-50',
                text: 'Сохранить'
            })
        });
    }
    render() {
        return compile(template, {
            avatar: this.props.avatar.render(),
            backButton: this.props.backButton.render(),
            oldPassword: this.props.oldPassword.render(),
            newPassword: this.props.newPassword.render(),
            confirmNewPassword: this.props.confirmNewPassword.render(),
            saveButton: this.props.saveButton.render()
        });
    }
}
let editPasswordPage = new EditPasswordPage();
render('.root', editPasswordPage);
//# sourceMappingURL=editPassword.js.map