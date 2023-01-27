const assert = require('assert');
const OptionResolver = require('../option-resolver.js');

describe('OptionResolver', () => {
    it('Resolve defaults', () => {
        const definition = new OptionResolver().setDefaults({ foo: 'bar' });

        assert.deepStrictEqual(
            definition.resolve({}),
            { foo: 'bar' }
        );
    });

    it('Resolve validators', () => {
        const definition = new OptionResolver().setValidators({
            foo: value => Math.min(1000, value)
        });

        assert.deepStrictEqual(
            definition.resolve({ foo: 1337 }),
            { foo: 1000 }
        );
    });

    it('Resolve types', () => {
        const definition = new OptionResolver().setTypes({ foo: 'number' });

        assert.throws(
            () => definition.resolve({ foo: 'bar' }),
            { message: 'Wrong value for option "foo": expected type "number", got "string".' }
        );

        assert.deepStrictEqual(
            definition.resolve({ foo: 42 }),
            { foo: 42 }
        );
    });

    it('Resolve optionals', () => {
        const definition = new OptionResolver().setOptional(['foo']);

        assert.deepStrictEqual(
            definition.resolve({}),
            {}
        );

        assert.deepStrictEqual(
            definition.resolve({ foo: true }),
            { foo: true }
        );
    });

    it('Resolve required', () => {
        const definition = new OptionResolver().setRequired(['foo']);

        assert.throws(
            () => definition.resolve({}),
            { message: 'Option "foo" is required.' }
        );

        assert.deepStrictEqual(
            definition.resolve({ foo: null }),
            { foo: null }
        );
    });

    it('Resolve extraData', () => {
        const definition = new OptionResolver();

        assert.throws(
            () => definition.resolve({ foo: 'bar' }),
            { message: 'Unkown option "foo".' }
        );

        definition.allowExtra();

        assert.deepStrictEqual(
            definition.resolve({ foo: 'bar' }),
            { foo: 'bar' }
        );
    });
});
