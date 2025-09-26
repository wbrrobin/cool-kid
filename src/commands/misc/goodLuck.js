const { guildId } = require("../../../config.json");

module.exports = {
    name: 'goodluck',
    description: 'Sends a good luck message.',
    deleted: "952564259047501834" !== guildId,
    callback: async (client, interaction) => {
        const channel = await client.channels.fetch("1412221455038550107");
        channel.send("GOOD LUCK IN WAR EVERYONE! 🍀");
        interaction.reply({ content: 'Good luck message sent!', ephemeral: true });
    }
};