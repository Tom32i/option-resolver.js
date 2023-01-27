option-resolver.js
================

Simple Javascript Option Resolver

## Install:

    npm install option-resolver.js

### Import

HTML:

```html
<script src="option-resolver.js"></script>
```

ES6:

```javascript
import OptionResolver from 'option-resolver.js';
```

Node:

```javascript
const OptionResolver = require('option-resolver.js');
```

## Usage:

Define the format of your configuration:

```javascript
const definition = new OptionResolver()
    .setTypes({
        color: 'string',
        length: 'number',
        debug: 'boolean',
    })
    .setRequired(['color'])
    .setDefaults({
        debug: false,
    });
```

Resolve a config object:

```javascript
const options = definition.resolve({
    color: 'red',
});
```

This return the following object:

```javascript
{
    color: 'red',
    debug: false,
}
```

## Features

### Default values

Define a default value for a property:

```javascript
// This will return `{ foo: 'bar' }`:
new OptionResolver()
    .setDefault({ foo: 'bar' })
    .resolve({});
```

### Required properties

You can mark a property as required, to ensure it's defined:

```javascript
// This will return `{ foo: 42 }`:
new OptionResolver()
    .setRequired(['foo'])
    .resolve({ foo: 42 });
```

If the required property is not provided, the OptionResolver will throw an exception:

```javascript
// This will throw an Error: `Option "foo" is required.`:
new OptionResolver()
    .setRequired(['foo'])
    .resolve({});
```

### Optional properties

By default, the option resolver throws an error if provided with a property that was not declared with `setRequired`, `setDefault`, `setTypes` or `setValidators`:

```javascript
// This will throw an Error: `Unkown option "foo".`:
new OptionResolver().resolve({ foo: true });
```

To allow such a property, you must define it as optional:

```javascript
// This will return `{ foo: true }`:
new OptionResolver()
    .setOptional(['foo'])
    .resolve({ foo: true });
```

_Note:_ Alternatively, you can allow any extra property with `allowExtra()`:

```javascript
// This will return `{ foo: true }`:
new OptionResolver()
    .allowExtra()
    .resolve({ foo: true});
```

### Property types

Validates the [type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values) of a property:

```javascript
// This will return `{ foo: 42 }`:
new OptionResolver()
    .setTypes({ foo: 'number' })
    .resolve({ foo: 42 });
```

If the property type doesn't match the expected type, the OptionResolver will throw an error:
```javascript
// This will throw an Error: `Wrong value for option "foo": expected type "number", got "string".`:
new OptionResolver()
    .setTypes({ foo: 'number' })
    .resolve({ foo: 'test' });
```

### Property validator

You can apply a validator function to constrain a value with a custom callback:

```javascript
const resolver = new OptionResolver().setValidators({
    // Constain "rate" property within 0 and 100:
    rate: value =>  Math.max(0, Math.min(100, value)),
});

// This will return `{ rate: 87 }`:
resolver.resolve({ rate: 87 });

// This will return `{ rate: 100 }`:
resolver.resolve({ rate: 124 });
```

_Note:_ The validator will not be executed if the property is not set.

```javascript
// This will return `{}`:
new OptionResolver()
    .setValidators({ name: value => value.trim() })
    .resolve({});
```
