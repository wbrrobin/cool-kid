const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "war",
    description: "Creates a new war voting for a given time.",
    options: [
        {
            name: "month",
            description: "Month of the war.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "day",
            description: "Day of the war.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "time",
            description: "Time of the war.",
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
        const day = interaction.options.get("day").value;
        const month = interaction.options.get("month").value;
        const hour = interaction.options.get("time").value;

        const year = 2025;

        const date = new Date(Date.UTC(year, month - 1, day, hour));

        const roleId = "1396340893476196432"
        await interaction.deferReply();
        interaction.deleteReply();
        interaction.channel
            .send(`<@&${roleId}> React to this if you could war <t:${date.getTime() / 1000 - 7200}:F>`)
            .then(message => {
                message.react("✅");
                message.react("🔁");
                message.react("❌");
            });
    }
};