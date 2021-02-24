import {expect, assert} from 'chai';
import HTTP, {METHODS, Options} from '../http/index';

describe('Тест модуля HTTP:', () => {
  const http = new HTTP('/api');
  let method: string | undefined;
  let fullUrl: string;


  http.request = (url: string, options: Options) => {
    method = options.method;
    fullUrl = url;
    return Promise.resolve({status: 200} as XMLHttpRequest);
  };

  it('Проверка метода get', async () => {
    expect((await (http.get('/get'))).status).equal(200);
    assert.equal(fullUrl, '/api/get');
    assert.equal(method, METHODS.GET);
  });

  it('Проверка метода post', async () => {
    expect((await (http.post('/post'))).status).equal(200);
    assert.equal(fullUrl, '/api/post');
    assert.equal(method, METHODS.POST);
  });

  it('Проверка метода delete', async () => {
    expect((await (http.delete('/delete'))).status).equal(200);
    assert.equal(fullUrl, '/api/delete');
    assert.equal(method, METHODS.DELETE);
  });

  it('Проверка метода put', async () => {
    expect((await (http.put('/put'))).status).equal(200);
    assert.equal(fullUrl, '/api/put');
    assert.equal(method, METHODS.PUT);
  });
});
