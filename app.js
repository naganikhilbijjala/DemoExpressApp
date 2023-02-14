const express = require('express');

const app = express();
let port = 3000;
let host = 'localhost';

app.get('/', (req, res) => {
    // res.statusCode = 200;
    // res.end('Home page');
    // Instead of doing like above there is a simple way in express
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});