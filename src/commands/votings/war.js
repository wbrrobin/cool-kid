const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");

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
                return { name: `${hour} ${period}`, value: i + 4 };
            })
        }
    ],
    callback: (client, interaction) => {
        createVoting(client, interaction, "war", "Red", "War");
    }
};