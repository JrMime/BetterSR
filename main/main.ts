import dotenv from "dotenv";
import tmi from 'tmi.js';

dotenv.config();

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TwitchUsername,
		password: process.env.TwitchPassword
	},
	channels: [ process.env.TwitchChannels ]
});


let prefix = process.env.TwitchPrefix;

client.connect();
client.on('message', (channel, tags, message, self) => {
    // Only allow prefix
    if (!message.startsWith(prefix)) return;
	
    // Ignore echoed messages.
	if (self) return;

    let args = message.slice(prefix.length).trim().split(/ +/),
      command = args.shift()?.toLowerCase();

	if (command == "hello") {
	  client.say(channel, `hello @${tags.username}!`);
	}
});