const { MessageFlags, EmbedBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } = require("discord.js");
const { guildId } = require("../../config.json");

module.exports = async (client, interaction, message, color, eventName, startDate = null, endDate = null) => {
    try {
        const year = 2025;

        if (!startDate && !endDate) {
            const month = interaction.options.get("1_month").value;
            const day = interaction.options.get("2_day").value;
            const hour = interaction.options.get("3_time").value;
            startDate = new Date(Date.UTC(year, month - 1, day, hour + 5));
            endDate = new Date(Date.UTC(year, month - 1, day, hour + 6));
        }

        await interaction.deferReply();
        interaction.deleteReply();

        // Send the message to the channel
        const embed = new EmbedBuilder()
            .setTitle(`React to this if you could ${message} <t:${startDate.getTime() / 1000}:F>`)
            .setColor(color);
        interaction.channel
            .send({ content: `<@&${"1396340893476196432"}>`, embeds: [embed] })
            .then(message => {
                message.react("✅");
                message.react("🔁");
                message.react("❌");
            });

        // Create event
        const guild = client.guilds.cache.find(guild => guild.id === guildId);
        const eventManager = new GuildScheduledEventManager(guild);
        eventManager.create({
            name: eventName,
            scheduledStartTime: startDate,
            scheduledEndTime: endDate,
            privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
            entityType: GuildScheduledEventEntityType.External,
            entityMetadata: { location: "Anywhere" }
        });
    } catch (error) {
        console.log(error);
        interaction.reply({
            flags: [MessageFlags.Ephemeral],
            content: "Something went wrong."
        });
    }
};