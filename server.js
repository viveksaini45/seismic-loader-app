const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '.')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const UPLOAD_DIR = path.join(__dirname, 'files');
// Endpoint to get list of uploaded files with metadata
app.get('/files', (req, res) => {
    // Read all files in the upload directory
    fs.readdir(UPLOAD_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read files' });
        }

        // Filter out only .json files which contain metadata
        const metadataFiles = files.filter(file => file.endsWith('.json'));
        const uploadedFiles = [];

        // Read each JSON metadata file and store the info in an array
        metadataFiles.forEach(file => {
            const metadata = fs.readFileSync(path.join(UPLOAD_DIR, file), 'utf8');
            const metadataJson = JSON.parse(metadata);

            const fileNameWithoutExt = file.replace('.json', '');
            const originalFile = files.find(f => f.startsWith(fileNameWithoutExt) && f !== file);
            const stats = fs.statSync(path.join(UPLOAD_DIR, originalFile));
            const fileSizeInBytes = stats.size;

            uploadedFiles.push({
                originalFile: originalFile || 'Unknown', // file might not exist or be renamed
                metadata: metadataJson,
                fileSizeInBytes:fileSizeInBytes
            });
        });

        // Send the array of uploaded files with metadata as JSON response
        res.json(uploadedFiles);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


