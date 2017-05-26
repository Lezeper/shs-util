/**
 * TODO: Just for testing
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.use((req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
console.log('Server is started.');