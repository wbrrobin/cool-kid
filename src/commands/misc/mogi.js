const { ApplicationCommandOptionType, BaseClient, MessageFlags } = require("discord.js");
const getMogiDetails = require("../../utils/getMogiDetails");

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
        try {
            const mogiDetails = await getMogiDetails(client, interaction);

            await interaction.deferReply();
            interaction.deleteReply();
            interaction.channel
                .send(`<@&${"1396340893476196432"}> React to this if you could mogi ${mogiDetails}`)
                .then(message => {
                    message.react("✅");
                    message.react("🔁");
                    message.react("❌");
                });
        } catch (error) {
            console.log(`[Error mogi] ${error}`);
            interaction.reply({
                flags: [MessageFlags.Ephemeral],
                content: "Something went wrong."
            });
        }
    }
};