const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");
const { ckRoleId } = require("../../../config.json");

module.exports = {
    name: "vod-review",
    description: "Creates a new VOD review voting for a given time.",
    options: [
        {
            name: "1_month",
            description: "Month of the VOD review.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "2_day",
            description: "Day of the VOD review.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "3_time",
            description: "Time of the VOD review. (bbs timezone lol)",
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
        createVoting(client, interaction, "VOD review", [ckRoleId], "Aqua", "VOD review", null, null, false);
    }
};