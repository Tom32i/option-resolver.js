const assert = require('assert');
const OptionResolver = require('../option-resolver.js');

describe('OptionResolver', () => {
    const definition = new OptionResolver()
        .setTypes({
            animation: 'boolean',
            color: 'string',
            length: 'number',
            debug: 'boolean',
        })
        .setRequired(['color'])
        .setOptional(['debug', 'length'])
        .setDefaults({
            animation: true,
            debug: false,
        });

    it('Resolve options', function () {
        const options = definition.resolve({
            animation: false,
            color: 'red',
        });

        assert.deepStrictEqual(options, {
            animation: false,
            color: 'red',
            debug: false,
        });

        assert.equal(typeof options.length, 'undefined');
    });

    it('Missing required throws an exception', function () {
        assert.throws(
            () => definition.resolve({}),
            { message: 'Option "color" is required.' }
        );
    });

    it('Extra key throws an exception', function () {
        assert.throws(
            () => definition.resolve({ foo: 'bar' }),
            { message: 'Unkown option "foo".' }
        );
    });

    it('Wrong type throws an exception', function () {
        assert.throws(
            () => definition.resolve({ animation: 'bar' }),
            { message: 'Wrong value for option "animation". Expected type "boolean" but got "string".' }
        );
    });
});
