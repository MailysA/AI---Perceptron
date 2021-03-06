/**
 * Created by Maïlys on 24/01/2015.
 */
var perceptron = new Perceptron();

var PIXEL_SIZE = 70; //pixels

var GRID_WIDTH = 0;
var GRID_HEIGHT = 0;

var OUTPUT_COUNT = 10;

var pixels = [];

var mousePressed = false;
var mousePixelIndex = -1;

function init() {
    var canvas = document.getElementById("canvas");
    GRID_WIDTH = Math.floor(canvas.width/PIXEL_SIZE);
    GRID_HEIGHT = Math.floor(canvas.height/PIXEL_SIZE);

    perceptron.initialiserReseauxNeuronaux(GRID_WIDTH * GRID_HEIGHT, 10);

    resetCanvas();

    canvas.addEventListener("click", function(e) {
        var mousePoint = mouseCanvasPosition(e);
        togglePixelAtPoint(mousePoint);
        drawPixels();
    });

    canvas.addEventListener("mousedown", function(e) {
        mousePressed = true;
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        mousePressed = false;
    }, false);

    canvas.addEventListener("mousemove", function(e) {
        if(mousePressed) {
            var mousePoint = mouseCanvasPosition(e);
            var pixelIndex = pixelIndexAtPoint(e);
            if(pixelIndex != mousePixelIndex) {
                setPixelValueAtPoint(mousePoint, true);
                drawPixels();
                mousePixelIndex = pixelIndex;
            }
        }
    })
}

function learnClicked() {
    var learnedNumber = parseInt($("#inputNumber").val());
    learn(learnedNumber);
    processClicked();
}

function processClicked() {
    processedNumbers = process();

    showProcessedNumbers(processedNumbers);
}

function showProcessedNumbers(processedNumbers) {
    var result = "";
    for(var i = 0; i < processedNumbers.length; i++) {
        result += processedNumbers[i].toString() + ",";
    }
    if(result.length > 0) result = result.substring(0, result.length-1);
    $("#outputNumber").val(result);
}

/* ------  */


function learn(nombre) {
    perceptron.apprendre(convertirPixelEnTable(), nombre);
}

function process() {
    return perceptron.chercher(convertirPixelEnTable());
}

/* ------  */

function convertirPixelEnTable(){
    var linearPixels = [];
    for (var i = 0; i < pixels.length; i++) {
        for (var j = 0; j < pixels[i].length; j++) {
            linearPixels[i * pixels[i].length + j] = pixels[i][j];
        }
    }

    return linearPixels;
}


function mouseCanvasPosition(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function pixelIndexAtPoint(point) {
    var pixelIndex = -1;
    var x = Math.floor(point.x/PIXEL_SIZE);
    var y = Math.floor(point.y/PIXEL_SIZE);
    if(x < GRID_WIDTH && y < GRID_HEIGHT) {
        pixelIndex = y * GRID_WIDTH + x;
    }
    return pixelIndex;
}

function togglePixelAtPoint(point) {
    var x = Math.floor(point.x/PIXEL_SIZE);
    var y = Math.floor(point.y/PIXEL_SIZE);
    if(x < GRID_WIDTH && y < GRID_HEIGHT) {
        pixels[x][y] = !pixels[x][y];
    }
}

function setPixelValueAtPoint(point, value) {
    var x = Math.floor(point.x/PIXEL_SIZE);
    var y = Math.floor(point.y/PIXEL_SIZE);
    if(x < GRID_WIDTH && y < GRID_HEIGHT) {
        pixels[x][y] = value;
    }
}

function resetCanvas() {
    resetPixels();
    drawPixels();
}

function resetPixels() {
    for(var x = 0; x < GRID_WIDTH; x++) {
        pixels[x] = [];
        for(var y = 0; y < GRID_HEIGHT; y++) {
            pixels[x][y] = false;
        }
    }
}

function drawPixels() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    for(var y = 0; y < GRID_HEIGHT; y++) {
        for(var x = 0; x < GRID_WIDTH; x++) {
            context.beginPath();
            context.rect(x*PIXEL_SIZE, y*PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
            context.fillStyle = pixels[x][y] ? '#2D2' : '#555';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#FFF';
            context.stroke();
        }
    }
}
