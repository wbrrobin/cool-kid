const db = require("../../../data/db.js");

module.exports = {
    name: "get-records",
    description: "Fetches all your time trial records.",
    callback: async (client, interaction) => {
        const rows = db.prepare(`
            SELECT track, category, time_ms FROM time_trials
            WHERE user_id = ?
            ORDER BY track ASC, category ASC
        `).all(interaction.user.id);

        if (rows.length === 0) {
            return interaction.reply("You have no time trial records.");
        }

        const records = rows.map(r => `- **${r.track} (${r.category})** — ${formatTime(r.time_ms)}`).join('\n');
        await interaction.reply(`🏁 **Your Time Trial Records**\n${records}`);
    }
};

function formatTime(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const milli = ms % 1000;
    return `${m}:${s.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`;
}