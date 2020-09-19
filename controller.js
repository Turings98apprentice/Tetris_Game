//const SQUARE_SIZE = 10;

/*$(document).ready(function() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
    //while(true) {mainLoop();}
});

function mainLoop() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
}

function drawGrid(int[][] gridArray) {
    
    for(int row=0; row<gridArray.Count(); row++) {
        for(int col=0; col<gridArray[row].Count(); col++) {
            drawSquare(row * SQUARE_SIZE, col * SQUARE_SIZE, gridArray[row][col]);
        }
    }
}

function drawSquare(int x, int y, String color) {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
}*/

var canvas, ctx, x, last, timer, row, col, bottom;

$(document).ready(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    x = 0;
    timer = 0;
    row = 0;
    col = 0;
    last = performance.now();
    requestAnimationFrame(draw);
});



function draw(timestamp) {
       
    requestAnimationFrame(draw);
    
    timer += timestamp - last;
    if(timer >= 1000) {
        timer = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(col * 20, row++ * 20, 20, 20);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        
    }
    
    x += (timestamp - last) / 10;
    last = timestamp;
    
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

    switch (event.key) {
    case "ArrowDown":
      // code for "down arrow" key press.
      break;
    case "ArrowUp":
      // code for "up arrow" key press.
      break;
    case "ArrowLeft":
      // code for "left arrow" key press.
        if(col > 0){  
        col--;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(col * 20, row * 20, 20, 20);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        }
      break;
    case "ArrowRight":
      // code for "right arrow" key press.
        if(col < 14){
        col++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(col * 20, row * 20, 20, 20);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        }
      break;
      default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window











