const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
    // Get all folders in the events folder. Folder names are events from discord
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    for (const eventFolder of eventFolders) {
        // Get all commands
        const eventFiles = getAllFiles(eventFolder);

        // Set command priority based on filename (01xyz.py, 02abc.py, ...)
        eventFiles.sort((a, b) => a > b);

        const eventName = path.basename(eventFolder);
        
        // Execute all commands
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        });
    }
};