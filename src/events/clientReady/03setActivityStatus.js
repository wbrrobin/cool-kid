const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.user.setActivity({
        name: "Practicing Choco Mountain",
        type: ActivityType.Custom
    });
};