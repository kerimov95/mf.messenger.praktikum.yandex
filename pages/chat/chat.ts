import { getChats, IChat } from "../../restApi/chat.setvice.js";
import { Block } from "../../utilities/block.js";
import { render } from "../../utilities/render.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./chat.template.js";

export interface IChatPage {
    chats: IChat[]
}

export class ChatPage extends Block {
    constructor(props: IChatPage) {
        super('main', {
            chats: props.chats
        })
    }

    render(): string {
        return compile(template, this.props)
    }
}

let chat: ChatPage;


getChats().then((_chats) => {
    chat = new ChatPage({
        chats: _chats
    });
    render('.root', chat);
})



