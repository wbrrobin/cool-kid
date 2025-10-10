const { ApplicationCommandOptionType, MessageFlags, EmbedBuilder } = require("discord.js");
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

            if (mogiDetails === undefined) {
                return;
            }

            await interaction.deferReply();
            interaction.deleteReply();
            const embed = new EmbedBuilder()
                .setTitle(`React to this if you could mogi ${mogiDetails}`)
                .setColor("Yellow");
            interaction.channel
                .send({ content: `<@&${"1396340893476196432"}>`, embeds: [embed] })
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