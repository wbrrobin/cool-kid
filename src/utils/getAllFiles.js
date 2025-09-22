const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    // Collect all file names in the directory
    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly && file.isDirectory() || file.isFile()) {
            fileNames.push(filePath);
        }
    }

    return fileNames;
};