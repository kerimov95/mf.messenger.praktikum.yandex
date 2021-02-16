import { backButtonComponent } from "../../components/backButton/backButton";
import { Block } from "../../modules/block";
import { compile } from "../../utilities/templator";
import { template } from "./profile.template";
import { AvatarComponent } from "../../components/avatar/avatar"
import { ItemInputComponent } from "../../components/itemInput/itemInput";
import { ButtonComponent } from "../../components/button/button";
import { ItemButtonComponent } from "../../components/itemButton/itemButton";
import { IProfile, ProfileApi } from "../../api/profile-api";
import { typeInput, ValidateForm } from "../../utilities/validate";
import { Router } from "../../modules/router/router";


export interface IProfilePage {
    profile?: IProfile;
    backButton?: backButtonComponent;
    isEdit?: boolean;
}

export class ProfilePage extends Block<IProfilePage> {

    private router = new Router();
    private profileApi: ProfileApi;

    constructor() {
        super('main', {
            backButton: new backButtonComponent({
                link: '../chat'
            }),
            profile: {},
            isEdit: false
        });
        this.profileApi = new ProfileApi();
    }

    componentDidMount() {
        const profile = new ProfileApi()
        profile.GetUserInfo().then(profile => {
            this.props.profile = profile
        })
    }

    render() {
        return compile(template, {
            backButton: this.props?.backButton?.render(),

            avatar: new AvatarComponent({
                id: 'avatar',
                name: this.props?.profile?.display_name,
                imageUrl: this.props?.profile?.avatar
            }).render(),

            email: new ItemInputComponent({
                label: 'Почта',
                id: 'email',
                type: 'email',
                value: this.props?.profile?.email,
                disabled: !this.props.isEdit,
                validate: { type: typeInput.email, requred: true }
            }).render(),

            login: new ItemInputComponent({
                label: 'Логин',
                id: 'login',
                type: 'text',
                value: this.props?.profile?.login,
                disabled: !this.props.isEdit,
                validate: { requred: true }
            }).render(),

            first_name: new ItemInputComponent({
                label: 'Имя',
                id: 'first_name',
                type: 'text',
                value: this.props?.profile?.first_name,
                disabled: !this.props.isEdit,
                validate: { requred: true }
            }).render(),

            second_name: new ItemInputComponent({
                label: 'Фамилия',
                id: 'second_name',
                type: 'text',
                value: this.props?.profile?.second_name,
                disabled: !this.props.isEdit,
                validate: { requred: true }
            }).render(),

            display_name: new ItemInputComponent({
                label: 'Имя в чате',
                id: 'display_name',
                type: 'text',
                value: this.props?.profile?.display_name,
                disabled: !this.props.isEdit,
                validate: { requred: true }
            }).render(),

            phone: new ItemInputComponent({
                label: 'Телефон',
                id: 'phone',
                type: 'text',
                value: this.props?.profile?.phone,
                disabled: !this.props.isEdit,
                validate: { type: typeInput.phone, requred: true }
            }).render(),

            saveProfile: new ButtonComponent({
                display: this.props?.isEdit ? 'block' : 'none',
                className: 'mt-3 btn btn-success w-50',
                text: 'Сохранить',
                id: 'saveButton',
                onClick: () => {
                    const form = document.getElementById('profileForm') as HTMLFormElement
                    const profile = ValidateForm<IProfile>(form)
                    if (profile)
                        this.profileApi.ChangeUserProfile(profile).then(() => {
                            this.setProps({
                                isEdit: false
                            });
                        })
                }
            }).render(),

            editProfile: new ItemButtonComponent({
                id: 'editBtn',
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Изменить данные',
                onClick: () => {
                    this.setProps({
                        isEdit: true
                    })
                }
            }).render(),

            editPassword: new ItemButtonComponent({
                id: 'editPass',
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Изменить пароль',
                onClick: () => {
                    this.router.go('/editpassword')
                }
            }).render(),

            ExitButton: new ItemButtonComponent({
                id: 'ExitBtn',
                display: this.props?.isEdit ? 'none' : 'flex',
                text: 'Выйти',
                className: 'text-danger',
                onClick: async () => {
                    await this.profileApi.Logout()
                        .then(status => {
                            if (status.code === 200) {
                                this.router.go('/')
                            }
                        });
                }

            }).render()
        })
    }
}