export const template = `
<div class="container-fluid row">
            <div class="sidebar col-3">
                <div class="row  p-2">
                    <div class=" col-12 pt-1 pb-1 d-flex flex-col align-items-end">
                        <a href="../profile">Профиль</a>
                    </div>
                    <div class="col-12 border-bottom d-flex flex-col pt-3 pb-3">
                        <input class="search-input" placeholder="Поиск" type="text" />
                    </div>
                </div>
                <ul class="row p-2">    
                {{#each chats}}
                <li class="item w-100 border-bottom d-flex flex-row justify-content-space-around align-items-center pt-2 pb-2">
                    <div class="h-100 w-25 d-flex justify-content-center align-items-center">
                        <div class="avatar"></div>
                    </div>
                    <div class="h-100 w-50 ml-1">
                        <span class="title">{{userName}}</span>
                        <p class="message">{{lastMessage}}</p>
                    </div>
                    <div class="h-100 w-25 d-flex flex-col justify-content-space-around align-items-center">
                        <time>{{time}}</time>
                        <div class="badge rounded-pill">
                            {{amount}}
                        </div>
                    </div>
                </li>
                {{/each}}            
                </ul>
            </div>
            <div class="col-9 d-flex flex-col justify-content-space-between align-items-center">
                <div class="flex-fill w-100 "> </div>
                <div class="w-100">
                    <div
                        class="border-top ml-3 mr-3 p-2 d-flex flex-row justify-content-space-between align-items-center">
                        <button class="icon-button">
                            <i class="fa fa-paperclip" aria-hidden="true"></i>
                        </button>
                        <input id="message" placeholder="Сообщение" class="m-1 flex-fill message-input" type="text">
                        <button onclick="consoleOutput({ message: message.value })" class="icon-button">
                            <i class="fa fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
`