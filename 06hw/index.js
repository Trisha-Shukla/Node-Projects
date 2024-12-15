const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


app.use(morgan('dev'));
app.use(morgan('combined', { stream: logStream })); 

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
