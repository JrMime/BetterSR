"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const tmi_js_1 = __importDefault(require("tmi.js"));
dotenv_1.default.config();
const client = new tmi_js_1.default.Client({
    options: { debug: true },
    identity: {
        username: process.env.TwitchUsername,
        password: process.env.TwitchPassword
    },
    channels: [process.env.TwitchChannels]
});
let prefix = process.env.TwitchPrefix;
client.connect();
client.on('message', (channel, tags, message, self) => {
    if (!message.startsWith(prefix))
        return;
    if (self)
        return;
    let args = message.slice(prefix.length).trim().split(/ +/), command = args.shift()?.toLowerCase();
    if (command == "hello") {
        client.say(channel, `hello @${tags.username}!`);
    }
});
