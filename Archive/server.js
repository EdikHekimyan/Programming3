var express = require("express");
var app = express();

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index");
});

app.listen(3001, function () {
    console.log("Example is running on port 3000");
});