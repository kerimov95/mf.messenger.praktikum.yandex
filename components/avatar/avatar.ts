import { ProfileApi } from "../../api/profile-api.js";
import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { ButtonComponent } from "../button/button.js";
import { template } from "./avatar.template.js";

export interface IAvatar {
    id: string;
    name?: string;
    imageUrl?: string;
}

export class AvatarComponent extends Block<IAvatar> {

    url: string;
    profileApi: ProfileApi;

    constructor(props: IAvatar) {

        super('div', {
            avatar: props,
            ButtonSave: new ButtonComponent({
                id: 'saveBtn',
                text: 'Поменять',
                className: 'btn btn-success w-50',
                onClick: async () => {
                    const input = document.getElementById('upload') as any;

                    var formData = new FormData();
                    formData.append("avatar", input.files[0], input.files[0].name);

                    await this.profileApi.ChangeUserAvatar(formData)
                        .then(res => {
                            if (res.statusCode === 200) {

                                let image = document.getElementById('imageAvatar') as HTMLImageElement;
                                image.src = this.getImgUrl(res.url);
                                let form = document.getElementById('loadAvatarForm') as HTMLDivElement;
                                form.style.display = "none"
                            }
                        })
                }
            }).render()
        });

        this.url = 'https://ya-praktikum.tech';

        if (props.imageUrl === null || props.imageUrl === undefined)
            props.imageUrl = 'https://vitamedrf.ru/upload/iblock/730/7305b4e50439dd7a254adea0c232c2fd.jpg';
        else
            props.imageUrl = this.getImgUrl(props.imageUrl);

        this.profileApi = new ProfileApi();
    }

    getImgUrl(imageUrl: string): string {
        return this.url + imageUrl;
    }


    render(): string {
        return compile(template, this.props);
    }
}