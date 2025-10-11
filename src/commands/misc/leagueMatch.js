const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");

module.exports = {
    name: "league-match",
    description: "Creates a new league match voting for a given time.",
    options: [
        {
            name: "enemy",
            description: "Enemy clan name.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "1_month",
            description: "Month of the match.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "2_day",
            description: "Day of the match.",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "3_time",
            description: "Time of the match. (bbs timezone lol)",
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
    callback: (client, interaction) => {
        createVoting(client, interaction, `play the league match against ${enemy}`, "Green", `League match against ${enemy}`);
    }
};