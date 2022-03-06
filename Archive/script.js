var socket = io();

var side = 60;

let weath = "summer"

function setup() {
    createCanvas(15 * side, 15 * side);
    background('#acacac');
    frameRate()
}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "summer") {
                    fill("green");
                }
                else if (weath == "autumn") {
                    fill("#333300");
                }
                else if (weath == "winter") {
                    fill("white");
                }
                else if (weath == "spring") {
                    fill("#4dffa6");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }



}


socket.on('send matrix', nkarel)

function killAll() {
    socket.emit("kill all")
}
function killGrass() {
    socket.emit("kill grass")
}
function killGrassEater() {
    socket.emit("kill grass eater")
}
function killPredator() {
    socket.emit("kill predator")
}
function addAll() {
    socket.emit("add all")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}