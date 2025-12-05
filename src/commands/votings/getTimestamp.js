const { MessageFlags, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "get-timestamp",
    description: "Returns a discord timestamp for a date.",
    options: [
        {
            name: "1_month",
            description: "Month.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "2_day",
            description: "Day.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "3_time",
            description: "Time. (bbs timezone lol)",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: Array.from({ length: 24 }, (_, i) => {
                const period = i < 12 ? "AM" : "PM";
                let hour = i % 12;
                hour = hour === 0 ? 12 : hour;
                return { name: `${hour} ${period}`, value: i + 4 };
            })
        }
    ],
    callback: (client, interaction) => {
        const year = 2025;

        const month = interaction.options.get("1_month").value;
        const day = interaction.options.get("2_day").value;
        const hour = interaction.options.get("3_time").value;
        const date = new Date(Date.UTC(year, month - 1, day, hour));

        const embed = new EmbedBuilder()
            .setTitle(`<t:${date.getTime() / 1000}:F>`);

        interaction.reply({ flags: [MessageFlags.Ephemeral], embeds: [embed], content: `\`\`\`<t:${date.getTime() / 1000}:F>\`\`\`` });
    }
};