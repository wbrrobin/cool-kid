const { ApplicationCommandOptionType, BaseClient, MessageFlags } = require("discord.js");

module.exports = {
    name: "mogi",
    description: "Creates a new mogi voting for a given mogi number.",
    options: [
        {
            name: "number",
            description: "Number of the mogi in #lounge-sq-schedule.",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    callback: async (client, interaction) => {
        try {
            const mogiNr = interaction.options.get("number").value;

            const channel = await client.channels.fetch("1399040539109756938");
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first().content;

            const lines = lastMessage.split("\n");
            let mogiDetails = lines.find((line) => line.includes(`#${mogiNr}`));

            // Check if mogi exists
            if (mogiDetails === undefined) {
                interaction.reply({
                    flags: [MessageFlags.Ephemeral],
                    content: "Mogi does not exist."
                });
                return;
            }

            // Remove last part of the message
            mogiDetails = mogiDetails.split(" - ")[0];

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
            console.log(error);
            interaction.reply({
                flags: [MessageFlags.Ephemeral],
                content: "Something went wrong."
            });
        }
    }
};