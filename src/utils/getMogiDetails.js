module.exports = async (client, interaction) => {
    const mogiNr = interaction.options.get("mogi_id").value;

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
    return mogiDetails.split(" - ")[0];
}