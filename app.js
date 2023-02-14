const express = require('express');

const app = express();
let port = 3000;
let host = 'localhost';

app.listen(port, host, () => {
    console.log('The server is running on port', port);
});