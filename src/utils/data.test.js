import { listToObject } from './data';

describe('listToObject tests', () => {

    it('Returns an object from an empty list', () => {
        expect(Object.keys(listToObject([], 'id')).length).toEqual(0);
    });

    it('Returns an object with id->value', () => {
        const data = [{ id: 1, name: 'first'}, { id: 2, name: 'second' }];
        expect(listToObject(data, 'id')).toEqual({
            1: { id: 1, name: 'first' },
            2: { id: 2, name: 'second' },
        });
    });

    it('Returns an object with name->value', () => {
        const data = [{ id: 1, name: 'first'}, { id: 2, name: 'second' }];
        expect(listToObject(data, (e) => e.name)).toEqual({
            'first': { id: 1, name: 'first' },
            'second': { id: 2, name: 'second' },
        });
    });
});

