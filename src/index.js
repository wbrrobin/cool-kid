const { Client, IntentsBitField, ActivityType } = require('discord.js');
const eventHandler = require("./handlers/eventHandler");
const { token } = require("../config.json");

// Bot instance
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent
    ],
    presence: {
        activities: [{
            name: "Proud to be a cool kid 💓",
            type: ActivityType.Custom
        }]
    }
});

// Handle all events
eventHandler(client);

// Login
client.login(token);