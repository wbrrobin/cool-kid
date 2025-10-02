const { ApplicationCommandOptionType, ThreadAutoArchiveDuration } = require("discord.js");
const getMogiDetails = require("../../utils/getMogiDetails");

module.exports = {
    name: 'confirm-mogi',
    description: 'Confirm a mogi. Automatically creates an announcement and a thread.',
    options: [
        {
            name: "mogi_id",
            description: "ID of the mogi to confirm.",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: "player_1_igl",
            description: "Player 1 who does IGL.",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "player_2",
            description: "Player 2.",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "player_3",
            description: "Player 3.",
            type: ApplicationCommandOptionType.User,
            required: false
        },
        {
            name: "player_4",
            description: "Player 4.",
            type: ApplicationCommandOptionType.User,
            required: false
        },
        {
            name: "player_5",
            description: "Player 5.",
            type: ApplicationCommandOptionType.User,
            required: false
        },
        {
            name: "player_6",
            description: "Player 6.",
            type: ApplicationCommandOptionType.User,
            required: false
        },
        {
            name: "team_nr",
            description: "Team number.",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    callback: async (client, interaction) => {
        try {
            players = [];
            const igl = interaction.options.get("player_1_igl").user;
            players.push(igl);
            players.push(interaction.options.get("player_2").user);
            if (interaction.options.get("player_3")) players.push(interaction.options.get("player_3").user);
            if (interaction.options.get("player_4")) players.push(interaction.options.get("player_4").user);
            if (interaction.options.get("player_5")) players.push(interaction.options.get("player_5").user);
            if (interaction.options.get("player_6")) players.push(interaction.options.get("player_6").user);

            const teamNr = interaction.options.get("team_nr")?.value || 1;

            const mogiDetails = await getMogiDetails(client, interaction);

            // Create mogi announcement
            await interaction.deferReply();
            interaction.deleteReply();
            await interaction.channel.send(`${mogiDetails} Team ${teamNr}: ${players.join(" ")} IGL: ${igl}`);

            // Create thread for mogi
            const mogi_id = interaction.options.get("mogi_id").value;
            interaction.channel.threads.create({
                name: `Mogi #${mogi_id} - Team ${teamNr}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneDay
            })
                .then(threadChannel => {
                    threadChannel.send(`Time: ${mogiDetails.split(" ")[3]}\nPlayers: ${players.join(" ")}\nIGL: ${igl}`);
                });

        } catch (error) {
            console.log(`[Error confirmMogi] ${error}`);
            interaction.reply({
                flags: [MessageFlags.Ephemeral],
                content: "Something went wrong."
            });
        }
    }
};