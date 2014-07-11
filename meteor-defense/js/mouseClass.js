/// <reference group="Dedicated Worker" />

var isdown = false;
var isPressed = false;
var mouseClick = false;

function addMouseEvent(stage) {
    stage.onClick = function () {
        mouseClick = true;
    }
    stage.onMouseDown = function () {
        isdown = true;
        isPressed = true;
    }
    stage.onMouseUp = function () {
        isdown = false;
    }
}

function MouseTick() {
    mouseClick = false;
    isPressed = false;
}