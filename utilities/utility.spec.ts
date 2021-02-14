import { expect } from "chai";
import { isArray, isPlainObject, isArrayOrObject, isEqual } from './utility'


describe("Проверка утилит", () => {

    it('Проверка метода isArray', () => {
        expect(isArray([1, 2, 4])).equals(true);
    });

    it('Проверка метода isPlainObject', () => {
        expect(isPlainObject({ id: 1 })).equals(true);
    });

    it('Проверка метода isArrayOrObject obj', () => {
        expect(isArrayOrObject({ id: 1 })).equals(true);
    });

    it('Проверка метода isArrayOrObject arr', () => {
        expect(isArrayOrObject([1, 2, 4])).equals(true);
    });

    it('Проверка метода isEqual', () => {
        expect(isEqual({ id: 1, name: 'test' }, { id: 1, name: 'test' })).equals(true);
    });
}); 