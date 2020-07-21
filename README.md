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
```

Resolve a config object:

```javascript
const options = definition.resolve({
    animation: false,
    color: 'red',
});
```

This return the following object:

```javascript
{
    animation: false,
    color: 'red',
    debug: false,
}
```

## Validation:

Resolving a set of options will throw an error when:

* A `required` option is missing
* An option valud doesn't match the expected `type`.
* A unknown option is given. Note: You can disable this behaviour and allow extra key by specifying the `allowExtra` option as follow: `new OptionsResolver(true)`.
