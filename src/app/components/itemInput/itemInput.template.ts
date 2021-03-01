export const template = `
<div class="itemInput border-bottom p-1 d-flex justify-content-space-between align-items-center">
    <label for="{{id}}">{{label}} <span class="text-danger" id="{{id}}error"></span></label>
    <input id="{{id}}" type="{{type}}" autocomplete="{{autocomplete}}" value="{{value}}">
</div>
`;
