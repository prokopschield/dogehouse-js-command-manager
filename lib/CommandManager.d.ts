import { FormattedMessageChunk, UnformattedMessageChunk } from "doge-utils";
export declare type CommandListener = (message: any, argc: number, argv: string[], argt: FormattedMessageChunk[]) => undefined | UnformattedMessageChunk | Promise<UnformattedMessageChunk>;
export declare type __internal_commands = Array<{
    regex: string | RegExp;
    handler: CommandListener;
}>;
export default class CommandManager {
    constructor(client: any);
    private _client;
    private _commands;
    private _receive;
    emit(message: any): void;
    add(command: string | RegExp, handler: CommandListener): void;
}
