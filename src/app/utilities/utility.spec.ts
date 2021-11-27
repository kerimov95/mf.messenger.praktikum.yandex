import {expect} from 'chai';
import {isArray, isPlainObject, isArrayOrObject, isEqual} from './utility';


describe('Тест утилит', () => {
  it('Тест метода isArray позитивный кейс', () => {
    expect(isArray([1, 2, 4])).equals(true);
  });

  it('Тест метода isArray негативный кейс', () => {
    expect(isArray(19)).equals(false);
  });

  it('Тест метода isPlainObject позитивный кейс', () => {
    expect(isPlainObject({id: 1})).equals(true);
  });

  it('Тест метода isPlainObject негативный кейс', () => {
    expect(isPlainObject([{id: 1}])).equals(false);
  });

  it('Тест метода isArrayOrObject obj позитивный кейс', () => {
    expect(isArrayOrObject({id: 1})).equals(true);
  });

  it('Тест метода isArrayOrObject arr позитивный кейс', () => {
    expect(isArrayOrObject([1, 2, 4])).equals(true);
  });

  it('Тест метода isArrayOrObject негативный кейс', () => {
    expect(isArrayOrObject(1999)).equals(false);
  });

  it('Тест метода isEqual позитивный кейс', () => {
    expect(isEqual({id: 1, name: 'test'}, {id: 1, name: 'test'})).equals(true);
  });

  it('Тест метода isEqual негативный кейс', () => {
    const arg1 = {id: 1, name: 'test'};
    const arg2 = {id: 1, name: 'tests'};
    expect(isEqual(arg1, arg2)).equals(false);
  });
});
