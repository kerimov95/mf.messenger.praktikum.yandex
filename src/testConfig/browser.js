const {JSDOM} = require('jsdom');
const Handlebars = require('Handlebars');

const dom = new JSDOM(
    `<!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            
        </body>
    </html>`,
    {
      url: 'http://localhost:3000',
      contentType: 'text/html',
    },
);

global.window = dom.window;
global.document = dom.window.document;
global.FormData = dom.window.FormData;
global.Handlebars = Handlebars;
