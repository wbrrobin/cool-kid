const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly && !devs.includes(interaction.member.id)) {
            interaction.reply({
                content: "Only developers are allowed to run this command.",
                ephemeral: true
            });
            return;
        }

        if (commandObject.testOnly && interaction.guild.id !== testServer) {
            interaction.reply({
                content: "This command cannot be ran here.",
                ephemeral: true
            });
            return;
        }

        // Check if command requires permissions from the user
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough permissions.",
                        ephemeral: true
                    });
                    break;
                }
            }
        }

        // Check if command requires permissions from the bot
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                if (!interaction.member.permissions.has(permission)) {
                    const bot = interaction.guild.members.me;

                    if (!bot.permissions.has(permission)) {
                        interaction.reply({
                            content: "Not enough permissions.",
                            ephemeral: true
                        });
                        break;
                    }
                }
            }
        }

        // Execute command
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};