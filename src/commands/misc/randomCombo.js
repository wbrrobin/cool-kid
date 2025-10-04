const fs = require("fs");
const crypto = require("crypto");

module.exports = {
    name: "random-combo",
    description: "Get a random combo of character + vehicle.",
    callback: async (client, interaction) => {
        try {
            const data = JSON.parse(fs.readFileSync("data/chars-and-vehicles.json"));

            const getRandom = (arr) => arr[crypto.randomInt(0, arr.length)];
            const character = getRandom(data.characters);
            const vehicle = getRandom(data.vehicles);
            await interaction.reply(`Your random combo is: **${character.name}** on the **${vehicle.name}**!`);
            interaction.channel.send(`<:Emblem_${character.emoji}:${character.id}> <:${vehicle.emoji}:${vehicle.id}>`);
        } catch (error) {
            console.log(`[Error randomCombo]: ${error}`);
            interaction.reply("Something went wrong.");
        }
    }
};