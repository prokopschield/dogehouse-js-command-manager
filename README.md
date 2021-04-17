# DogeHouse.js Command Manager

### TypeScript
`import CommandManager from 'dogehouse-js-command-manager'`

### JavaScript
`const CommandManager = require('dogehouse-js-command-manager')`

### Usage
```
const manager = new CommandManager(app); // app is the dogehouse client
manager.add('!myCommand', (message, argc, argv, argt) => <your function here>);
```

`message` => message object

`argc` => number of arguments

`argv` => array of arguments

`argt` => array of tokens

You may return a reply.

This will be sent back to the sender!

To not send anything back, do not return anything, or return `null`

You **may** supply an async function, everything **should** work fine.

(c) 2021 - see [License](https://www.gnu.org/licenses/gpl-3.0.txt)
