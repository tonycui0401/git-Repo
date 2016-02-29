var express = require('express'),
    app = express();

app.use(express.static(__dirname + ''));

app.listen(8880)

console.log("listen to port 8880");