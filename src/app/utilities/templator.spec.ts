import {expect} from 'chai';
import {compile} from './templator';


describe('Тест шаблонизатора', () => {
  it('Тест метода compile', () => {
    const user = {
      name: 'Kerimov',
      age: 29,
    };
    const content = '<div><p>{{name}}</p><p>{{age}}</p><div>';
    const result = `<div><p>${user.name}</p><p>${user.age}</p><div>`;
    expect(compile(content, user)).equals(result);
  });
});
