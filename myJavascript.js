"use strict";
var myDiv = document.getElementById('myDiv');
var px;
var py;

for (let x = 1; x < 17; x++) {
    for (let y = 1; y < 20; y++) {
        const element = document.createElement("div");
        element.className = 'gameGrid';

        if (tileMap01.mapGrid[x - 1][y - 1][0] === "W") {
            element.classList.add('wall');
        }
        else if (tileMap01.mapGrid[x - 1][y - 1][0] === "G") {
            element.classList.add('goal');
        }
        else if (tileMap01.mapGrid[x - 1][y - 1][0] === "B") {
            element.classList.add('block');
        }

        else if (tileMap01.mapGrid[x - 1][y - 1][0] === "P") {
            element.classList.add('player');
            px = x;
            py = y;

        }
        else {
            element.classList.add('ground');
        }

        element.id = "x" + x + "y" + y;
        console.log(element.id);

        myDiv.appendChild(element);
    }

    //logic if needed between rows
}

console.log(px);
console.log(py);
function playerMove(direction, oldLocation, x, y) {
    var newLocation = document.getElementById("x" + x + "y" + y);
    var newBlockLocation;
    if (direction !== undefined && direction !== null) {
        if (/*newLocation.classList.contains('block')*/true) {
            if (direction === 37)
                newBlockLocation = document.getElementById("x" + x + "y" + (y - 1));
            else if (direction === 39)
                newBlockLocation = document.getElementById("x" + x + "y" + (y + 1));
            else if (direction === 38)
                newBlockLocation = document.getElementById("x" + (x - 1) + "y" + y);
            else if (direction === 40)
                newBlockLocation = document.getElementById("x" + (x + 1) + "y" + y);
        }
    }

    if (newLocation.id !== undefined && newLocation.id !== null && !newLocation.classList.contains('wall') && !((newBlockLocation.classList.contains('wall') || newBlockLocation.classList.contains('block')) && newLocation.classList.contains('block'))) {
        if (newLocation.classList.contains('block') && !newBlockLocation.classList.contains('wall')) {
            console.log(newBlockLocation.id);
            newBlockLocation.classList.add('block');
            oldLocation.classList.remove('block');
            oldLocation.classList.add('ground');
            newLocation.classList.remove('block');
        }
        newLocation.classList.add('player');
        oldLocation.classList.remove('player');
        oldLocation = newLocation;
        px = x;
        py = y;
    }
}

function update() {
    document.addEventListener('keydown', keyPress);
}

function keyPress(event) {
    var playermovecase = event.keyCode;
    var oldLocation = document.getElementById("x" + px + "y" + py);

    switch (playermovecase) {
        case 37: //Left
            playerMove(37, oldLocation, px, py - 1);
            break;

        case 39://Right
            playerMove(39, oldLocation, px, py + 1);
            break;

        case 38://Up
            playerMove(38, oldLocation, px - 1, py);
            break;

        case 40://Down
            playerMove(40, oldLocation, px + 1, py);
            break;
    }
    console.log(playermovecase);
}
update();