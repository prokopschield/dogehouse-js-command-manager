"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doge_utils_1 = require("doge-utils");
class CommandManager {
    constructor(client) {
        this._commands = [];
        this._client = client;
        this._client.on('newChatMessage', (message) => {
            this._receive(message);
        });
    }
    async _receive(message) {
        if (message?.author?.id === message?._client?.bot?.id)
            return;
        const tokens = doge_utils_1.format(message.tokens || message.content || message.text || message);
        const plaintext = doge_utils_1.messageToString(tokens, {
            plain: false,
        });
        for (const handler of this._commands) {
            const split = plaintext.split(handler.regex);
            if (split.length > 1) {
                split.shift();
                for (const segment of split) {
                    const argv = segment.split(/ +/).filter(a => a);
                    const argc = argv.length;
                    const argt = argc ? doge_utils_1.format(argv) : [];
                    const response = await handler.handler(message, argc, argv, argt);
                    if (response && message?.reply)
                        message.reply(response, {
                            whispered: true,
                            mentionUser: false,
                        });
                }
            }
        }
    }
    emit(message) {
        this._receive(message);
    }
    add(command, handler) {
        this._commands.push({
            regex: command,
            handler,
        });
    }
}
exports.default = CommandManager;
module.exports = CommandManager;
