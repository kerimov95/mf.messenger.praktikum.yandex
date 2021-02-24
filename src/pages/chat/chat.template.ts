export const template = `
<div class="container-fluid row chat-page">
            <div class="sidebar col-3">
                <div class="row  p-2">
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
                <ul class="row p-2">    
                {{#each chats}}
                <li id="{{id}}" class="item w-100 border-bottom d-flex flex-row justify-content-space-around align-items-center pt-2 pb-2">
                    <div class="h-100 w-25 d-flex justify-content-center align-items-center">
                        <div class="avatar"></div>
                    </div>
                    <div class="h-100 w-50 ml-1">
                        <span class="title">{{title}}</span>
                        <p class="message">Hello!!!</p>
                    </div>
                    <div class="h-100 w-25 d-flex flex-col justify-content-space-around align-items-center">
                        <time>00:00</time>
                        <div class="badge rounded-pill">
                        0
                        </div>
                    </div>
                </li>
                {{/each}}            
                </ul>
            </div>
            <div class="col-9 d-flex flex-col justify-content-space-between align-items-center">
                <div class="flex-fill w-100"> 
                <div class="row w-100 border-bottom">
                   <div class="col-6 d-flex flex-col justify-content-space-around align-items-start">
                        <div class="ml-3">
                            {{currentChat.title}}
                        </div>
                   </div>                   
                   <div class="col-6 d-flex flex-col justify-content-space-around align-items-end">
                       <div>
                            {{{ addUserButton }}}
                            {{{ removeUserButton }}}
                       </div> 
                   </div>
                </div>               
                </div>
                <div class="w-100">
                    <div
                        class="border-top ml-3 mr-3 p-2 d-flex flex-row justify-content-space-between align-items-center">
                        <button class="icon-button">
                            <i class="fa fa-paperclip" aria-hidden="true"></i>
                        </button>
                        <input id="message" placeholder="Сообщение" class="m-1 flex-fill search-input" type="text">
                        <button onclick="consoleOutput({ message: message.value })" class="icon-button">
                            <i class="fa fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
`;
