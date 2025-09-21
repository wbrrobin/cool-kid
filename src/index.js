require("dotenv").config();

const { Client, IntentsBitField } = require('discord.js');

// Bot instance
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("clientReady", (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === "hello") {
        message.reply("hello");
    }
});

client.login(process.env.TOKEN);