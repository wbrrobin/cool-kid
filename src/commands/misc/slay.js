const { guildId, testGuildId } = require("../../../config.json");

module.exports = {
    name: 'slay',
    description: 'Sends a slay message.',
    deleted: guildId !== testGuildId,
    callback: async (client, interaction) => {
        const channel = await client.channels.fetch("1416969003922096209");
        channel.send("holy fuck guys");
        interaction.reply({ content: 'Slay message sent!', ephemeral: true });
    }
};