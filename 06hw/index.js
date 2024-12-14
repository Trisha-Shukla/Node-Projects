const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create a writable stream for logs
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Apply Morgan middlewares
app.use(morgan('dev')); // Logs to console
app.use(morgan('combined', { stream: logStream })); // Logs to file

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
