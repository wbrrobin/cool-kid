const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");

module.exports = {
    name: "scrim",
    description: "Creates a new scrim voting for a given time.",
    options: [
        {
            name: "1_month",
            description: "Month of the scrim.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "2_day",
            description: "Day of the scrim.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "3_time",
            description: "Time of the scrim. (bbs timezone lol)",
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
        createVoting(client, interaction, "internal scrim 12p 6v6", "Purple", "Internal scrim 12p 6v6", null, null, false);
    }
};