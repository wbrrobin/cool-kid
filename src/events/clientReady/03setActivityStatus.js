const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.user.setActivity({
        name: "Proud to be a cool kid 💓",
        type: ActivityType.Custom
    });

    client.application.edit({
        description: "For more info, check out https://github.com/wbrrobin/cool-kid."
    });
};