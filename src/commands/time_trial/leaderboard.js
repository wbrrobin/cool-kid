const { ApplicationCommandOptionType } = require("discord.js");
const db = require("../../../data/db.js");

module.exports = {
    name: "leaderboard",
    description: "Shows the time trial leaderboard for a track and optional category (default: shrooms).",
    options: [
        {
            name: "track",
            description: "Track.",
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true
        },
        {
            name: "category",
            description: "Category.",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "Shrooms", value: "Shrooms" },
                { name: "No shrooms", value: "No shrooms" }
            ]
        }
    ],
    callback: async (client, interaction) => {
        const track = interaction.options.getString("track");
        const category = interaction.options.getString("category") || "Shrooms";

        const rows = db.prepare(`
            SELECT user_id, time_ms FROM time_trials
            WHERE track = ? AND category = ?
            ORDER BY time_ms ASC
        `).all(track, category);

        if (rows.length === 0) {
            return interaction.reply(`Found no records for **${track} (${category})**.`);
        }

        const board = rows.map((r, i) => `**#${i + 1}** <@${r.user_id}> — ${formatTime(r.time_ms)}`).join('\n');
        await interaction.reply({ content: `🏁 **Leaderboard for ${track} (${category})**\n${board}`, allowedMentions: { users: [] } });
    },
    autocomplete: async (client, interaction) => {
        const focused = interaction.options.getFocused(true);

        const tracks = [
            "Salty Salty Speedway", "Airship Fortress", "Great ? Block Ruins", "Faraway Oasis", "Mario Bros. Circuit",
            "Cheep Cheep Falls", "Starview Peak", "Whistlestop Summit", "Bowser's Castle", "Shy Guy Bazaar", "Choco Mountain",
            "Dry Bones Burnout", "Crown City", "Peach Beach", "Toad's Factory", "Rainbow Road", "Peach Stadium", "Moo Moo Meadows",
            "Mario Circuit", "Dandelion Depths", "Boo Cinema", "Acorn Heights", "Wario Stadium", "Wario Shipyard", "Sky-High Sundae",
            "Koopa Troopa Beach", "DK Spaceport", "DK Pass", "Desert Hills", "Dino Dino Jungle"
        ];

        const filtered = tracks
            .filter((track) =>
                track.toLowerCase().includes(focused.value.toLowerCase())
            )
            .slice(0, 25);

        await interaction.respond(
            filtered.map((track) => ({ name: track, value: track }))
        );
    }
};

function formatTime(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const milli = ms % 1000;
    return `${m}:${s.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`;
}