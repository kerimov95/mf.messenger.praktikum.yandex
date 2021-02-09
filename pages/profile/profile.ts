import { backButtonComponent } from "../../components/backButton/backButton.js";
import { Block } from "../../modules/block.js";
import { render } from "../../modules/render.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./profile.template.js";
import { AvatarComponent } from "../../components/avatar/avatar.js"
import { ItemInputComponent } from "../../components/itemInput/itemInput.js";
import { getProfile, IProfile } from "../../api/profile.service.js";
import { ButtonComponent } from "../../components/button/button.js";
import { ItemButtonComponent } from "../../components/itemButton/itemButton.js";


export interface IProfilePage {
    profile?: IProfile;
    isEdit?: boolean;
}

export class ProfilePage extends Block {

    constructor(props?: IProfilePage) {

        super('main', {

            backButton: new backButtonComponent({
                link: '../chat'
            }),
            avatar: new AvatarComponent({
                id: 'avatar',
                name: props?.profile?.display_name
            }),

            email: props?.profile?.email,
            login: props?.profile?.login,
            first_name: props?.profile?.first_name,
            second_name: props?.profile?.second_name,
            display_name: props?.profile?.display_name,
            phone: props?.profile?.phone,
            isEdit: props?.isEdit
        })
    }

    render() {
        return compile(template, {
            backButton: this.props?.backButton?.render(),

            avatar: this.props?.avatar?.render(),

            email: new ItemInputComponent({
                label: 'Почта',
                id: 'email',
                type: 'email',
                value: this.props?.email,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            login: new ItemInputComponent({
                label: 'Логин',
                id: 'login',
                type: 'text',
                value: this.props?.login,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            first_name: new ItemInputComponent({
                label: 'Имя',
                id: 'first_name',
                type: 'text',
                value: this.props?.first_name,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            second_name: new ItemInputComponent({
                label: 'Фамилия',
                id: 'second_name',
                type: 'text',
                value: this.props?.second_name,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            display_name: new ItemInputComponent({
                label: 'Имя в чате',
                id: 'display_name',
                type: 'text',
                value: this.props?.display_name,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            phone: new ItemInputComponent({
                label: 'Телефон',
                id: 'phone',
                type: 'text',
                value: this.props?.phone,
                disabled: this.props?.isEdit ? 'none' : 'disabled'
            }).render(),

            saveProfile: new ButtonComponent({
                display: this.props?.isEdit ? 'block' : 'none',
                className: 'mt-3 btn btn-success w-50',
                text: 'Сохранить',
                id: 'saveButton',
                onclick: 'consoleOutput(profileForm); editProfile(false)'
            }).render(),

            editProfile: new ItemButtonComponent({
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Изменить данные',
                onclick: 'editProfile(true)'
            }).render(),

            editPassword: new ItemButtonComponent({
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Изменить пароль',
                onclick: 'location.href="./editPassword"'
            }).render(),

            ExitButton: new ItemButtonComponent({
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Выйти',
                className: 'text-danger'

            }).render()
        })
    }
}

let profile: ProfilePage;

getProfile().then(pr => {
    profile = new ProfilePage({
        profile: pr,
        isEdit: false
    });
    render('.root', profile)
});

(window as any).editProfile = (value: boolean) => {
    if (profile)
        profile.setProps({
            isEdit: value
        })
}