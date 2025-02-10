const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Create the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/get-html') {
        // Define the absolute HTML file path
        const filePath = path.join(__dirname, '../UI/Login/login.html');
        console.log('Serving file from:', filePath); // Log the file path for debugging

        // Read the HTML file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }

            // Send the HTML file content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
