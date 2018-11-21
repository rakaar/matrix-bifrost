import { PurpleProtocol } from "./PurpleInstance";
import { PurpleAccount } from "./PurpleAccount";
import { Event, Conversation } from "node-purple";
import { IEventBody, IAccountEvent, IChatJoined } from "./PurpleEvents";
import { IConfigPurple } from "../Config";
import { EventEmitter } from "events";

export interface IPCMessageIncoming {
    i: number;
    module: string;
    function: string;
    args: any[];
}

export interface IPCMessageResult {
    i: number;
    module: string;
    function: string;
    thrown: string|null;
    result: any;
}

export interface IPurpleInstance extends EventEmitter {
    getBuddyFromChat(conv: Conversation, buddy: string): any;
    start(config: IConfigPurple): Promise<void>;
    getAccount(username: string, protocolId: string): PurpleAccount|null;
    getProtocol(id: string): PurpleProtocol|undefined;
    getProtocols(): PurpleProtocol[];
    findProtocol(nameOrId: string): PurpleProtocol|undefined;
    getNickForChat(conv: Conversation): string;
    on(name: string, cb: (ev: IEventBody) => void);
    on(name: "account-connection-error"|"account-signed-on"|"account-signed-off", cb: (ev: IAccountEvent) => void);
    on(name: "chat-joined", cb: (ev: IChatJoined) => void);
}
