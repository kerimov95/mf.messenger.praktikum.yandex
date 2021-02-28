import {queryString} from '../../utilities/utility';

export enum METHODS {
  /* eslint-disable no-unused-vars */
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

type request = Promise<XMLHttpRequest>;

export default class HTTP {
  private url: string;

  constructor(url: string = 'https://ya-praktikum.tech/api/v2/') {
    this.url = url;
  }

  public async get(url: string, options?: Options): request {
    if (options?.queryParam) {
      url = `${url}?${queryString(options.queryParam)}`;
    }
    const _options = {...options, method: METHODS.GET};
    return this.request(`${this.url}${url}`, _options, options?.timeout);
  };

  public async post(url: string, options?: Options): request {
    if (options?.queryParam) {
      url = `${url}?${queryString(options.queryParam)}`;
    }
    const _options = {...options, method: METHODS.POST};
    return this.request(`${this.url}${url}`, _options, options?.timeout);
  };

  public async put(url: string, options?: Options): request {
    if (options?.queryParam) {
      url = `${url}?${queryString(options.queryParam)}`;
    }
    const _options = {...options, method: METHODS.PUT};
    return this.request(`${this.url}${url}`, _options, options?.timeout);
  };

  public async delete(url: string, options?: Options): request {
    if (options?.queryParam) {
      url = `${url}?${queryString(options.queryParam)}`;
    }
    const _options = {...options, method: METHODS.DELETE};
    return this.request(`${this.url}${url}`, _options, options?.timeout);
  };

  public request(url: string, options: Options, timeout = 5000): request {
    const {method, body} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.open(method as string, url);

      xhr.onload = function() {
        resolve(xhr);
      };

      if (options.headers && options.headers.length > 0) {
        options.headers.forEach((header) => {
          xhr.setRequestHeader(header.key, header.value);
        });
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !body) {
        xhr.send();
      } else if (body instanceof FormData) {
        xhr.send(body);
      } else {
        xhr.send(JSON.stringify(body));
      }
    });
  };
}
