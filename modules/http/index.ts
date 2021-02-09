import { queryString } from '../../utilities/utility.js'

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

interface Options {
    queryParam: any;
    body: any;
    headers: any;
    timeout: number;
    method: string;
}

export default class HTTP {

    url: string

    constructor(url: string = "") {
        this.url = url;
    }

    get = (url: string, options: Options) => {
        if (options.queryParam)
            url = `${url}?${queryString(options.queryParam)}`
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options: Options) => {
        if (options.queryParam)
            url = `${url}?${queryString(options.queryParam)}`
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.POST }, options.timeout);
    };


    request = (url: string, options: Options, timeout = 5000) => {

        const { method, body } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.timeout = timeout;

            xhr.open(method, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !body) {
                xhr.send();
            } else {
                xhr.send(body);
            }
        });
    };
}