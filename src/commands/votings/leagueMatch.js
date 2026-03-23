const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");
const { ckRoleId, timeZoneDiff } = require("../../../config.json");

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
            name: "3_hour",
            description: "Hour of the match. (Central Time)",
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
            description: "Minutes of the match hour.",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    callback: (client, interaction) => {
        const enemy = interaction.options.get("enemy").value;

        createVoting(client, interaction, `play the league match against **${enemy}**`, [ckRoleId], "Green", `League match against ${enemy}`);
    }
};