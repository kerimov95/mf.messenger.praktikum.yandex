declare global {
    /* eslint-disable no-unused-vars */
    const Handlebars: any;
}

export function compile(template: string, props: any): string {
  return Handlebars.compile(template)(props);
}
