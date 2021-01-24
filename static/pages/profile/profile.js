import { backButtonComponent } from "../../components/backButton/backButton.js";
import { Block } from "../../utilities/block.js";
import { render } from "../../utilities/render.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./profile.template.js";
import { AvatarComponent } from "../../components/avatar/avatar.js";
import { ItemInputComponent } from "../../components/itemInput/itemInput.js";
import { getProfile } from "../../restApi/profile.setvice.js";
import { ButtonComponent } from "../../components/button/button.js";
import { ItemButtonComponent } from "../../components/itemButton/itemButton.js";
export class ProfilePage extends Block {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f, _g;
        super('main', {
            backButton: new backButtonComponent({
                link: '../chat'
            }),
            avatar: new AvatarComponent({
                id: 'avatar',
                name: (_a = props === null || props === void 0 ? void 0 : props.profile) === null || _a === void 0 ? void 0 : _a.display_name
            }),
            email: (_b = props === null || props === void 0 ? void 0 : props.profile) === null || _b === void 0 ? void 0 : _b.email,
            login: (_c = props === null || props === void 0 ? void 0 : props.profile) === null || _c === void 0 ? void 0 : _c.login,
            first_name: (_d = props === null || props === void 0 ? void 0 : props.profile) === null || _d === void 0 ? void 0 : _d.first_name,
            second_name: (_e = props === null || props === void 0 ? void 0 : props.profile) === null || _e === void 0 ? void 0 : _e.second_name,
            display_name: (_f = props === null || props === void 0 ? void 0 : props.profile) === null || _f === void 0 ? void 0 : _f.display_name,
            phone: (_g = props === null || props === void 0 ? void 0 : props.profile) === null || _g === void 0 ? void 0 : _g.phone,
            isEdit: props === null || props === void 0 ? void 0 : props.isEdit
        });
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return compile(template, {
            backButton: (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.backButton) === null || _b === void 0 ? void 0 : _b.render(),
            avatar: (_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.avatar) === null || _d === void 0 ? void 0 : _d.render(),
            email: new ItemInputComponent({
                label: 'Почта',
                id: 'email',
                type: 'email',
                value: (_e = this.props) === null || _e === void 0 ? void 0 : _e.email,
                disabled: ((_f = this.props) === null || _f === void 0 ? void 0 : _f.isEdit) ? 'none' : 'disabled'
            }).render(),
            login: new ItemInputComponent({
                label: 'Логин',
                id: 'login',
                type: 'text',
                value: (_g = this.props) === null || _g === void 0 ? void 0 : _g.login,
                disabled: ((_h = this.props) === null || _h === void 0 ? void 0 : _h.isEdit) ? 'none' : 'disabled'
            }).render(),
            first_name: new ItemInputComponent({
                label: 'Имя',
                id: 'first_name',
                type: 'text',
                value: (_j = this.props) === null || _j === void 0 ? void 0 : _j.first_name,
                disabled: ((_k = this.props) === null || _k === void 0 ? void 0 : _k.isEdit) ? 'none' : 'disabled'
            }).render(),
            second_name: new ItemInputComponent({
                label: 'Фамилия',
                id: 'second_name',
                type: 'text',
                value: (_l = this.props) === null || _l === void 0 ? void 0 : _l.second_name,
                disabled: ((_m = this.props) === null || _m === void 0 ? void 0 : _m.isEdit) ? 'none' : 'disabled'
            }).render(),
            display_name: new ItemInputComponent({
                label: 'Имя в чате',
                id: 'display_name',
                type: 'text',
                value: (_o = this.props) === null || _o === void 0 ? void 0 : _o.display_name,
                disabled: ((_p = this.props) === null || _p === void 0 ? void 0 : _p.isEdit) ? 'none' : 'disabled'
            }).render(),
            phone: new ItemInputComponent({
                label: 'Телефон',
                id: 'phone',
                type: 'text',
                value: (_q = this.props) === null || _q === void 0 ? void 0 : _q.phone,
                disabled: ((_r = this.props) === null || _r === void 0 ? void 0 : _r.isEdit) ? 'none' : 'disabled'
            }).render(),
            saveProfile: new ButtonComponent({
                display: ((_s = this.props) === null || _s === void 0 ? void 0 : _s.isEdit) ? 'block' : 'none',
                className: 'mt-3 btn btn-success w-50',
                text: 'Сохранить',
                id: 'saveButton',
                onclick: 'consoleOutput(profileForm); editProfile(false)'
            }).render(),
            editProfile: new ItemButtonComponent({
                display: ((_t = this.props) === null || _t === void 0 ? void 0 : _t.isEdit) ? 'none' : 'flex',
                text: 'Изменить данные',
                onclick: 'editProfile(true)'
            }).render(),
            editPassword: new ItemButtonComponent({
                display: ((_u = this.props) === null || _u === void 0 ? void 0 : _u.isEdit) ? 'none' : 'flex',
                text: 'Изменить пароль',
                onclick: 'location.href="./editPassword"'
            }).render(),
            ExitButton: new ItemButtonComponent({
                display: ((_v = this.props) === null || _v === void 0 ? void 0 : _v.isEdit) ? 'none' : 'flex',
                text: 'Выйти',
                className: 'text-danger'
            }).render()
        });
    }
}
let profile;
getProfile().then(pr => {
    profile = new ProfilePage({
        profile: pr,
        isEdit: false
    });
    render('.root', profile);
});
window.editProfile = (value) => {
    if (profile)
        profile.setProps({
            isEdit: value
        });
};
//# sourceMappingURL=profile.js.map