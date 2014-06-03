options-resolver.js
================

Simple Javascript Option Resolver

## Usage:

```javascript
var options = new OptionResolver()
    .setTypes({
        animation: 'boolean',
        color: 'string',
        length: 'number',
        debug: false
    })
    .setRequired(['color'])
    .setOptional(['debug', length])
    .setDefaults({
        animation: true
    })
    .resolve({
        animation: false,
        color: 'red',
    });

/**
 * This will get you:
 * {
 *     animation: false,
 *     color: 'red',
 *     debug: false
 * }
 */
```

## Exception:

Throws exeptions when:

* A option is of the wrong type
* A required option is not given
* A unknown option is given