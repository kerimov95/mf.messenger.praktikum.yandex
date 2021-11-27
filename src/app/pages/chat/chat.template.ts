export const template = `
<div class="container-fluid row chat-page">
    <div class="sidebar bar d-flex flex-col col-3">
        <div class="row p-2">
            <div class=" col-12 pt-1 pb-1 d-flex flex-col align-items-end">
                <a href="profile">Профиль</a>
            </div>
            <div class="col-12 d-flex flex-col pt-3 pb-3">
                <input class="search-input" placeholder="Поиск" type="text" />
            </div>
            <div class="border-bottom col-12 pt-1 pb-1 d-flex flex-col align-items-start">
                {{{createChatButton}}}
            </div>
        </div>
        <div class="overflow-scroll ">
            {{{chatList}}}
        </div>
    </div>
    <div class="col-9 d-flex flex-col justify-content-space-between align-items-center messages">
        <div class="w-100">
            <div id="chatBar" style="display:none"
                class="border-bottom ml-3 mr-3 d-flex flex-row justify-content-space-between align-items-center">
                <div class="d-flex flex-col justify-content-space-around align-items-start">
                    <div class="ml-3 text-success">
                        {{currentChat.title}}
                    </div>
                </div>
                <div class="d-flex flex-col justify-content-space-around align-items-end">
                    <div class="mr-3 dropdown">
                        <div class="d-flex flex-col align-items-end">
                            {{{ settingButton }}}
                        </div>
                        <div class="dropdown-content">
                            {{{ editAvatar }}}
                            {{{ addUserButton }}}
                            {{{ removeUserButton }}}
                            {{{ deleteChatButton }}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-fill overflow-scroll w-100">
          <div class="p-3">
          {{#each messages}}
            <div class="d-flex {{class}}">
                <div class="messageBox child">
                    <h3>{{name}}</h3>
                    <p>
                        {{content}}
                    </p>
                </div>
            </div>
            {{/each}}   
          </div>
        </div>
        <div class="w-100">
            <div class="border-top ml-3 mr-3 p-2 d-flex flex-row justify-content-space-between align-items-center">
                <button class="icon-button">
                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                </button>
                <input id="message" placeholder="Сообщение" class="m-1 flex-fill search-input" type="text">
                {{{ iconBtn }}}
            </div>
        </div>
    </div>
</div>
`;
