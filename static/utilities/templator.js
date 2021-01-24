Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});
export function compile(template, props) {
    return Handlebars.compile(template)(props);
}
//# sourceMappingURL=templator.js.map