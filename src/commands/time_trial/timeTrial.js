const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const db = require("../../../data/db.js");

module.exports = {
    name: "save-time-trial",
    description: "Adds or updates a time trial record (default: shrooms).",
    options: [
        {
            name: "track",
            description: "Track.",
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true
        },
        {
            name: "time",
            description: "Time in m:ss:SSS format.",
            type: ApplicationCommandOptionType.String,
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
        const time = interaction.options.getString("time");
        const timeMs = parseTime(time);

        if (!timeMs) {
            return interaction.reply({ content: "❌ Illegal time format. Example: `1:23.456`", flags: [MessageFlags.Ephemeral] });
        }

        const stmt = db.prepare(`
            INSERT INTO time_trials (user_id, username, track, category, time_ms)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(user_id, track, category)
            DO UPDATE SET time_ms = excluded.time_ms, updated_at = CURRENT_TIMESTAMP
        `);

        stmt.run(interaction.user.id, interaction.user.username, track, category, timeMs);

        await interaction.reply(`✅ Saved time for **${track} (${category})**: ${time}`);
    },

    autocomplete: async (client, interaction) => {
        const focused = interaction.options.getFocused(true);

        const tracks = [
            "Salty Salty Speedway", "Airship Fortress", "Great ? Block Ruins", "Faraway Oasis", "Mario Bros. Circuit",
            "Cheep Cheep Falls", "Starview Peak", "Whistlestop Summit", "Bowser's Castle", "Shy Guy Bazaar", "Choco Mountain",
            "Dry Bones Burnout", "Crown City", "Peach Beach", "Toad's Factory", "Rainbow Road", "Peach Stadium", "Moo Moo Meadows",
            "Mario Circuit", "Dandelion Depths", "Boo Cinema", "Acorn Heights", "Wario Stadium", "Wario Shipyard", "Sky-High Sundae",
            "Koopa Troopa Beach", "DK Spaceport", "DK Pass", "Desert Hills"
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

function parseTime(str) {
    const match = str.match(/(\d+):(\d+)\.(\d+)/);
    if (!match) return null;
    const [_, m, s, ms] = match;
    return parseInt(m) * 60_000 + parseInt(s) * 1000 + parseInt(ms.padEnd(3, '0'));
}