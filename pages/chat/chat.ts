import { getChats, IChat } from "../../api/chat.service.js";
import { Block } from "../../modules/block.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./chat.template.js";

export interface IChatPage {
    chats: IChat[]
}

export class ChatPage extends Block<IChatPage> {
    constructor() {
        super('main', {
            chats: []
        })
    }

    componentDidMount() {
        getChats().then(ch => {
            this.props.chats = ch
        })
    }


    render(): string {
        return compile(template, this.props)
    }
}