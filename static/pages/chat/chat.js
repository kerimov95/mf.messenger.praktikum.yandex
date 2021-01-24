import { getChats } from "../../restApi/chat.setvice.js";
import { Block } from "../../utilities/block.js";
import { render } from "../../utilities/render.js";
import { compile } from "../../utilities/templator.js";
import { template } from "./chat.template.js";
export class ChatPage extends Block {
    constructor(props) {
        super('main', {
            chats: props.chats
        });
    }
    render() {
        return compile(template, this.props);
    }
}
let chat;
getChats().then((_chats) => {
    chat = new ChatPage({
        chats: _chats
    });
    render('.root', chat);
});
//# sourceMappingURL=chat.js.map