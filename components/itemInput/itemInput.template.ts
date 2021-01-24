export const template = `
<div class="item border-bottom p-1 d-flex justify-content-space-between align-items-center">
    <label for="{{id}}">{{label}}</label>
    <input onkeyup="validateComments(this)" {{disabled}} id="{{id}}" type="{{type}}" autocomplete="{{autocomplete}}" value="{{value}}">
</div>
<span class="text-danger" id="{{id}}error"></span>
`