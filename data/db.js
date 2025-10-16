const Database = require("better-sqlite3");
const db = new Database("data/time_trials.db");

db.exec(`
CREATE TABLE IF NOT EXISTS time_trials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    track TEXT NOT NULL,
    category TEXT NOT NULL,
    time_ms INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, track, category)
);
`);

module.exports = db;