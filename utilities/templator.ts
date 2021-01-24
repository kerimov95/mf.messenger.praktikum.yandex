declare global {
    const Handlebars: any;
}

Handlebars.registerHelper('json', function (context: any): any {
    return JSON.stringify(context);
});

export function compile(template: string, props: any): string {
    return Handlebars.compile(template)(props);
}

