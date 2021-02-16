import { queryString } from '../../utilities/utility'

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

export interface Options {
    queryParam?: any;
    body?: any;
    headers?: { key: string, value: string }[];
    timeout?: number;
    method?: string;
}

export default class HTTP {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async get(url: string, options?: Options): Promise<XMLHttpRequest> {
        if (options?.queryParam)
            url = `${url}?${queryString(options.queryParam)}`;
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.GET }, options?.timeout);
    };

    public async post(url: string, options?: Options): Promise<XMLHttpRequest> {
        if (options?.queryParam)
            url = `${url}?${queryString(options.queryParam)}`;
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.POST }, options?.timeout);
    };

    public async put(url: string, options?: Options): Promise<XMLHttpRequest> {
        if (options?.queryParam)
            url = `${url}?${queryString(options.queryParam)}`;
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.PUT }, options?.timeout);
    };

    public async delete(url: string, options?: Options): Promise<XMLHttpRequest> {
        if (options?.queryParam)
            url = `${url}?${queryString(options.queryParam)}`;
        return this.request(`${this.url}${url}`, { ...options, method: METHODS.DELETE }, options?.timeout);
    };



    public request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {

        const { method, body } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.timeout = timeout;
            xhr.withCredentials = true;

            xhr.open(method as string, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            if (options.headers && options.headers.length > 0) {
                options.headers.forEach(header => {
                    xhr.setRequestHeader(header.key, header.value)
                })
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !body) {
                xhr.send();
            }
            else if (body instanceof FormData) {
                xhr.send(body);
            }
            else {
                xhr.send(JSON.stringify(body));
            }
        });
    };
}