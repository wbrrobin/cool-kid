const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");
const { ckRoleId, timeZoneDiff } = require("../../../config.json");

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
            name: "3_hour",
            description: "Hour of the scrim. (Central Time)",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: Array.from({ length: 24 }, (_, i) => {
                const period = i < 12 ? "AM" : "PM";
                let hour = i % 12;
                hour = hour === 0 ? 12 : hour;
                return { name: `${hour} ${period}`, value: i + timeZoneDiff };
            })
        },
        {
            name: "4_minutes",
            description: "Minutes of the scrim hour.",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    callback: (client, interaction) => {
        createVoting(client, interaction, "internal scrim 12p 6v6", [ckRoleId], "Purple", "Internal scrim 12p 6v6", null, null, false);
    }
};