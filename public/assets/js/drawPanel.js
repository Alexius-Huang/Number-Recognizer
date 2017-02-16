var $canvas = {
  element: null,
  width:  window.innerWidth,
  height: window.innerHeight,
  drawing: false
};
var $ctx;
var $controlPanel = {
  element: null,
  mode: 'pen',
  eraser: null,
  pen: null,
  defaultPenSize: 30
};

$(document).ready(function() {
  draw2DCanvas(function() {
    drawOnCanvasEvents();
    $('#pen-btn').click();
  });
});

function draw2DCanvas(callback) {
  initCanvasObject();
  initControlPanelObject();

  if ($canvas.element.getContext) {
    $ctx = $canvas.element.getContext('2d');
    $ctx.lineCap = 'round';

    /* Clear Button for clearing the whole canvas */
    $('#clear-btn').on('click', function() {
      $ctx.clearRect(0, 0, 300, 300);
      $ctx.fillStyle = 'white';
      $ctx.fillRect(0, 0, 300, 300);
    });
    $('#clear-btn').click();

    callback();
  }
}

function initCanvasObject() {
  $canvas.element = document.getElementById('main-canvas');
  $canvas.element.width  = 300;
  $canvas.element.height = 300;
}

function initControlPanelObject() {
  $controlPanel.element = document.getElementById('control-panel');
  $controlPanel.pen    = document.getElementById('pen-btn');
  $controlPanel.eraser = document.getElementById('eraser-btn');
  $controlPanel.pen.addEventListener('click', function() {
    $controlPanel.mode = 'pen';
    $('#pen-btn').addClass('active');
    $('#eraser-btn').removeClass('active');
  });
  $controlPanel.eraser.addEventListener('click', function() {
    $controlPanel.mode = 'eraser';
    $('#eraser-btn').addClass('active');
    $('#pen-btn').removeClass('active');
  });
}

function drawOnCanvasEvents() {
  $canvas.element.addEventListener('mousedown', function(event) {
    $canvas.drawing = true;
    switch($controlPanel.mode) {
      case 'pen':
        $ctx.globalCompositeOperation = 'source-over';
        $ctx.strokeStyle = $controlPanel.getCurrentColor ? $controlPanel.getCurrentColor() : '#000000';
        break;
      case 'eraser':
        $ctx.globalCompositeOperation = 'destination-out';
        $ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';   
    }
    $ctx.lineWidth = $controlPanel.defaultPenSize;
    $ctx.beginPath();
    $ctx.moveTo(event.offsetX, event.offsetY);
  });
  $canvas.element.addEventListener('mouseup', function(event) {
    $canvas.drawing = false;
    $ctx.stroke();
  });
  $canvas.element.addEventListener('mousemove', function(event) {
    if ($canvas.drawing) {
      $ctx.lineTo(event.offsetX, event.offsetY);
      $ctx.stroke();
      $ctx.beginPath();
      $ctx.moveTo(event.offsetX, event.offsetY);      
    }
  });
}