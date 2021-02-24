import {expect} from 'chai';
import {Block} from '../block';
import {Router} from './router';

export class MockedComponent extends Block {
  constructor() {
    super('div', {});
  }

  render() {
    return `mocked component`;
  }
}

describe('Тест Router', () => {
  it('Проверка навигации', (done) => {
    const router = new Router('.app');
    router.use('/chats', MockedComponent);
    router.go('/chats');
    const pathname = window.location.pathname;
    expect(pathname).is.eq('/chats');
    done();
  });

  it('Проверка навигации на notFound', (done) => {
    const router = new Router('.app');
    router.use('/chats', MockedComponent);
    router.use('/notFound', MockedComponent);
    try {
      router.go('/asldkjasdlkj');
      const pathname = window.location.pathname;
      expect(pathname).is.eq('/notFound');
      done();
    } catch (err) {
      done(err);
    }
  });
});
