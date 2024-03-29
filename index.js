const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

/* eslint-disable new-cap */
const router = express.Router();


router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static('./dist'));
app.use('/', router);

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
