const { Client, IntentsBitField, REST, Routes } = require('discord.js');
const eventHandler = require("./handlers/eventHandler");
const { clientId, guildId, token } = require("../config.json");

const rest = new REST().setToken(token);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);


// Bot instance
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

// Handle all events
eventHandler(client);

// Login
client.login(token);