const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDatabase() {
    const db = await open({
        filename: 'data/time_trials.db',
        driver: sqlite3.Database
    });

    await db.exec(`
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

    return db;
}

module.exports = initDatabase;
