export const template = `
<div class="container-fluid d-flex justify-content-center align-items-center">
    <div
        class="d-flex flex-col justify-content-space-around shadow rounded align-items-center registration-page">
        <h1>{{title}}</h1>
        <form class="w-100 ml-3 mr-3" id="userForm">
            {{{email}}}
            {{{login}}}
            {{{first_name}}}
            {{{second_name}}}
            {{{phone}}}
            {{{password}}}
            {{{password_confirm}}}
        </form>
        {{{button}}}
        <a href="/">Войти</a>
    </div>
</div>
`