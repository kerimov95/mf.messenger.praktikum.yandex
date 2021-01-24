export const template = `
    <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="shadow rounded d-flex flex-col justify-content-space-around align-items-center login-form">
        <h1>{{title}}</h1>
        <form class="w-100 ml-3 mr-3" id="user">
            {{{login}}}
            {{{password}}}
        </form>
        <div class="w-100 d-flex flex-col justify-content-center align-items-center">
            {{{button}}}
            <a href="../registration/registration.html">Нет аккаунта?</a>
        </div>
    </div>
    </div>
`;
//# sourceMappingURL=login.template.js.map