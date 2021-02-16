const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const router = express.Router();


router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.use(express.static('./static'));
app.use('/', router);

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});