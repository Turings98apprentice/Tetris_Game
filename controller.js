const int SQUARE_SIZE = 10;

$(document).ready(function() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
    //while(true) {mainLoop();}
});

/*function mainLoop() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
}*/

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
}