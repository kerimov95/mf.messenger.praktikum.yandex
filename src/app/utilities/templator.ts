declare global {
    /* eslint-disable no-unused-vars */
    const Handlebars: any;
}

Handlebars.registerHelper('getUrl', function(url: string) : string {
  if (url) {
    return 'https://ya-praktikum.tech' + url;
  } else {
    return 'https://vitamedrf.ru/upload/iblock/730/7305b4e50439dd7a254adea0c232c2fd.jpg';
  };
});

export function compile(template: string, props: any): string {
  return Handlebars.compile(template)(props);
}
