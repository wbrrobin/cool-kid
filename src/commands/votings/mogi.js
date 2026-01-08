const { ApplicationCommandOptionType } = require("discord.js");
const createVoting = require("../../utils/createVoting.js");
const getMogiDetails = require("../../utils/getMogiDetails");
const { ckRoleId } = require("../../../config.json");

module.exports = {
    name: "mogi",
    description: "Creates a new mogi voting for a given mogi number.",
    options: [
        {
            name: "mogi_id",
            description: "Number of the mogi in #lounge-sq-schedule.",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    callback: async (client, interaction) => {
        const mogiDetails = await getMogiDetails(client, interaction);
        
        if (mogiDetails === undefined) {
            return;
        }

        // Get general info and date (UNIX time)
        const detailParts = mogiDetails.split(" <t:");
        const generalInfo = detailParts[0];
        const generalInfoWithoutDate = generalInfo
            .replace(":", "")
            .replace("`", "")
            .replace("`", "")
            .replace("**", "")
            .replace("**", "");
        const timePart = parseInt(detailParts[1].replace(":F>", ""));

        const startDate = new Date(timePart * 1000);
        const endDate = new Date((timePart + 3600) * 1000);

        createVoting(client, interaction, `mogi ${generalInfo}`, [ckRoleId], "Yellow", `Mogi ${generalInfoWithoutDate}`, startDate, endDate);
    }
};