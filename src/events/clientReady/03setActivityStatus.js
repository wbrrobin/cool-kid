const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.user.setActivity({
        name: "Cooling my kid rn",
        type: ActivityType.Custom
    });
};