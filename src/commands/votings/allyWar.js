const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");
const { ckAllyRoleId, timeZoneDiff } = require("../../../config.json");

module.exports = {
    name: "ally-war",
    description: "Creates a new war voting for allies for a given time.",
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
            name: "3_hour",
            description: "Hour of the war. (Central Time)",
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
            description: "Minutes of the war hour.",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    callback: (client, interaction) => {
        createVoting(client, interaction, "war", [ckAllyRoleId], "Red", "", null, null, false, false);
    }
};