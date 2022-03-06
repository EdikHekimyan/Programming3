var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});


function generator(matLen, gr, grEat, pr) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    return matrix;
}
matrix = generator(15, 600, 100, 100);


grassArr = []
grassEaterArr = []
predatorArr = []

weath = "winter";
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")


function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3)
                predatorArr.push(pr)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}


function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 400)



function killAll() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function killGrass() {
    grassArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 0
            };
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function killGrassEater() {
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                matrix[y][x] = 0
            };
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function killPredator() {
    predatorArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 3) {
                matrix[y][x] = 0
            };
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAll() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
            matrix[y][x] = 2
            var grEat = new GrassEater(x, y, 2)
            grassEaterArr.push(grEat)
            matrix[y][x] = 3
            var pr = new Predator(x, y, 3)
            predatorArr.push(pr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            var grEat = new GrassEater(x, y, 2)
            grassEaterArr.push(grEat)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var pr = new Predator(x, y, 3)
            predatorArr.push(pr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    createObject();
    socket.on("kill all", killAll);
    socket.on("kill grass", killGrass);
    socket.on("kill grass eater", killGrassEater);
    socket.on("kill predator", killPredator);
    socket.on("add all", addAll);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)