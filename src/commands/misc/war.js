const { ApplicationCommandOptionType, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "war",
    description: "Creates a new war voting for a given time.",
    options: [
        {
            name: "1_month",
            description: "Month of the war.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "2_day",
            description: "Day of the war.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "3_time",
            description: "Time of the war. (bbs timezone lol)",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: Array.from({ length: 24 }, (_, i) => {
                const period = i < 12 ? "AM" : "PM";
                let hour = i % 12;
                hour = hour === 0 ? 12 : hour;
                return { name: `${hour} ${period}`, value: i };
            })
        }
    ],
    callback: async (client, interaction) => {
        try {
            const month = interaction.options.get("1_month").value;
            const day = interaction.options.get("2_day").value;
            const hour = interaction.options.get("3_time").value;

            const year = 2025;

            const date = new Date(Date.UTC(year, month - 1, day, hour));

            await interaction.deferReply();
            interaction.deleteReply();

            const embed = new EmbedBuilder()
                .setTitle(`React to this if you could war <t:${date.getTime() / 1000 + 5 * 3600}:F>`)
                .setColor("Red");
            interaction.channel
                .send({ content: `<@&${"1396340893476196432"}>`, embeds: [embed] })
                .then(message => {
                    message.react("✅");
                    message.react("🔁");
                    message.react("❌");
                });
        } catch (error) {
            console.log(error);
            interaction.reply({
                flags: [MessageFlags.Ephemeral],
                content: "Something went wrong."
            });
        }
    }
};