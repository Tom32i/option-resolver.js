/**
 * Option Resolver
 *
 * @param {Boolean} allowExtra
 */
function OptionResolver (allowExtra)
{
    this.allowExtra = typeof allowExtra !== 'undefined' && allowExtra;
    this.defaults   = {};
    this.types      = {};
    this.optional   = [];
    this.required   = [];
}

/**
 * Set defaults
 *
 * @param {Object} defaults
 */
OptionResolver.prototype.setDefaults = function(defaults)
{
    for (var name in defaults) {
        if(defaults.hasOwnProperty(name)) {
            this.defaults[name] = defaults[name];
        }
    }

    return this;
};

/**
 * Set types
 *
 * @param {Object} types
 */
OptionResolver.prototype.setTypes = function(types)
{
    for (var name in types) {
        if(types.hasOwnProperty(name)) {
            this.types[name] = types[name];
        }
    }

    return this;
};

/**
 * Set optional
 *
 * @param {Array} values
 */
OptionResolver.prototype.setOptional = function(values)
{
    if (this.allowExtra) {
        return;
    }

    this.addToArray(this.optionals, values);

    return this;
};

/**
 * Set required
 *
 * @param {Array} values
 */
OptionResolver.prototype.setRequired = function(values)
{
    this.addToArray(this.required, values);

    return this;
};

/**
 * Resolve
 *
 * @param {Object} options
 *
 * @return {Object}
 */
OptionResolver.prototype.resolve = function(source)
{
    var options = {};

    for (var name in this.defaults) {
        if(this.defaults.hasOwnProperty(name)) {
            options[name] = this.getValue(source, name);
        }
    }

    for (var i = this.required.length - 1; i >= 0; i--) {
        name = this.required[i];
        if (typeof options[name] === 'undefined') {
            throw 'Option "' + name + '" is required.';
        }
    }

    return options;
};

/**
 * Get value
 *
 * @param {Object} options
 * @param {String} name
 *
 * @return {mixed}
 */
OptionResolver.prototype.getValue = function(options, name)
{
    var value = null;

    if (!this.optionExists(name)) {
        throw 'Unkown option "' + name + '".';
    }

    if (typeof(options[name]) !== 'undefined') {
        value = options[name];
    } else if (typeof(this.defaults[name]) !== 'undefined') {
        value = this.defaults[name];
    }

    this.checkType(name, value);

    return value;
};

/**
 * Is type valid
 *
 * @param {String} name
 * @param {mixed} value
 *
 * @return {Boolean}
 */
OptionResolver.prototype.checkType = function(name, value)
{
    var expectedType = typeof(this.types[name]) !== 'undefined' ? this.types[name] : false,
        givenType = typeof(value);

    if (expectedType && givenType !== expectedType) {

        if (expectedType === 'string') {
            value = String(value);
        }

        if (expectedType === 'boolean') {
            value = Boolean(value);
        }

        if (expectedType === 'number') {
            value = Number(value);
        }

        givenType = typeof value;

        if (expectedType !== givenType) {
            throw 'Wrong type for option "' + name + '". Expected ' + this.types[name] + ' but got ' + typeof value;
        }
    }
};

/**
 * Does this option exists?
 *
 * @param {String} name
 *
 * @return {Boolean}
 */
OptionResolver.prototype.optionExists = function(name)
{
    if (this.allowExtra) {
        return true;
    }

    return typeof this.defaults[name] !== 'undefined' || this.optional.indexOf(name) >= 0 || this.required.indexOf(name) >= 0;
};

/**
 * Set defaults
 *
 * @param {Object} defaults
 */
OptionResolver.prototype.addToArray = function(array, values)
{
    var value;

    for (var i = values.length - 1; i >= 0; i--) {
        value = values[i];

        if (array.indexOf(value) >= 0) {
            array.push(value);
        }
    }
};