const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Sends an embed!",
    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("Embed Title")
            .setDescription("This is an embed description")
            .setColor("Random")
            .addFields(
                { name: "Field title", value: "Some random value", inline: true },
                { name: "2nd Field title", value: "Some random value", inline: true }
            );

        interaction.reply({ embeds: [embed] });
    }
};