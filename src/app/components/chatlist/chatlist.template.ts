export const template = `
    <ul class="row p-2">   
    {{#each chats}}
    <li id="{{id}}" class="item w-100 border-bottom d-flex flex-row justify-content-space-around align-items-center pt-2 pb-2">
        <div class="h-100 w-25 d-flex justify-content-center align-items-center">
            <img id="{{id}}" src="{{getUrl avatar}}"
                class="chatAvatar d-flex justify-content-center align-items-center">
             </img>
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
`;