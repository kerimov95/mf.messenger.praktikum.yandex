export const template = `
<label class="form-label" for="{{name}}">{{label}} <span class="text-danger" id="{{id}}error"></span></label>
<input placeholder="{{placeholder}}" id="{{id}}" name="{{name}}" type="{{type}}" class="form-control {{className}}" autocomplete="{{autocomplete}}">
`