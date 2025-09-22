const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require("./handlers/eventHandler");
const { token } = require("../config.json");

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