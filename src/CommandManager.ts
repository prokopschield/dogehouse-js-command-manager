import {
	format,
	FormattedMessageChunk,
	messageToString,
	UnformattedMessageChunk,
} from "doge-utils";

export type CommandListener = (message: any, argc: number, argv: string[], argt: FormattedMessageChunk[]) => void | undefined | UnformattedMessageChunk | Promise<UnformattedMessageChunk>;

export type __internal_commands = Array<{
	regex: string | RegExp;
	handler: CommandListener;
}>;

export default class CommandManager {
	/**
	 * Pass in the Client instance - your app
	 * @param client dogehouse.js Client
	 */
	constructor (client: any) {
		this._client = client;
		this._client.on('newChatMessage', (message: any) => {
			this._receive(message);
		})
	}
	private _client: any;
	private _commands: __internal_commands = [];
	private async _receive (message: any) {
		// return if I sent the message !!!
		if (message?.author?.id === message?._client?.bot?.id) return;
		const tokens = format(message.tokens || message.content || message.text || message);
		const plaintext = messageToString(tokens, {
			plain: false,
		});
		for (const handler of this._commands) {
			const split = plaintext.split(handler.regex);
			if (split.length > 1) {
				split.shift();
				for (const segment of split) {
					const argv = segment.split(/ +/).filter(a => a);
					const argc = argv.length;
					const argt = argc ? format(argv) : [];
					const response = await handler.handler(message, argc, argv, argt);
					if (response && message?.reply) message.reply(response, {
						whispered: true,
						mentionUser: false,
					});
				}
			}
		}
	}
	/**
	 * Emit a message to test the handler(s)
	 * @param message Message object
	 */
	emit (message: any) {
		this._receive(message);
	}
	/**
	 * 
	 * @param command The actual command, such as !mycommand
	 * @param handler This function will be called every time someone says the command in chat
	 */
	add (command: string | RegExp, handler: CommandListener) {
		this._commands.push({
			regex: command,
			handler,
		});
	}
}
module.exports = CommandManager;
