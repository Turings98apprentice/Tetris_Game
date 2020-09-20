var canvas, ctx, x, last, timer, row, col, deadBlocks, currentrow, 
currentcol, speed, R=0, end=0, highScore=0, score=0, reseted = false;

square_shape = [
    {x:0, y:0},
    {x:1, y:0},
    {x:0, y:-1},
    {x:1, y:-1}
];
t_shape = [
    {x:0, y:0},
    {x:1, y:0},
    {x:2, y:0},
    {x:1, y:-1}
];
 line_shape = [
    {x:0, y:-3},
    {x:0, y:-2},
    {x:0, y:-1},
    {x:0, y:0}
];

shapes = [
    square_shape, line_shape, t_shape
];
colors = [
  "#0CF742", "#13E000", "#76F70C", "#76F70C"
]


$(document).ready(function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  x = 0;
  timer = 0;
  row = 0;
  col = 7;
  speed = 500;
  deadBlocks = [];
  last = performance.now();
  requestAnimationFrame(draw);
});

function randomColor(){
  rc = Math.floor((Math.random()*4));
  return colors[rc];
}

function Reset() {
  score = 0;
  document.getElementById("score").innerHTML = score;
  canvas.clear;
  deadBlocks = [];
  x = 0;
  timer = 0;
  row = 0;
  col = 7;
  speed = 500; 
  end = 0;
  console.log(timestamp);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(timestamp) {
  requestAnimationFrame(draw);
    if (end == 0){
    
    timer += timestamp - last;
        if (shapes[R] == square_shape){
            if((row<25) && (checkShape(col, row, square_shape) == false) && (checkShape(col + 1, row, square_shape) == false)) {
               if(timer >= speed) {
                 timer = 0;
                 drawBlocks();
                 row++;
               } 
            }
            else{
                for (var i=0; i<square_shape.length; i++){
                deadBlocks.push({x:square_shape[i].x + col, y:square_shape[i].y + row-1});
                    score=deadBlocks.length;
                    document.getElementById("score").innerHTML = score;
                }
                x = 0;
                timer = 0;
                row = 0;
                col = 7;
                speed = 500; 
                R = Math.floor((Math.random()*3));
                for (var v=0; v<deadBlocks.length; v++){
                    if (deadBlocks[v].y == -1){
                    end = 1;
                    }
                }
            }
        }
          if (shapes[R] == line_shape){
            if((row<25) && (checkShape(col, row, line_shape) == false)) {
               if(timer >= speed) {
                 timer = 0;
                 drawBlocks();
                 row++;
               } 
            }
            else{
                for (var i=0; i<line_shape.length; i++){
                deadBlocks.push({x:line_shape[i].x + col, y:line_shape[i].y + row-1});
                    score=deadBlocks.length;
                    document.getElementById("score").innerHTML = score;
                }
                x = 0;
                timer = 0;
                row = 0;
                col = 7;
                speed = 500; 
                R = Math.floor((Math.random()*3));
                for (var v=0; v<deadBlocks.length; v++){
                    if (deadBlocks[v].y == -1){
                    end = 1;
                    }
                }
            }
            }
        if (shapes[R] == t_shape){
            if((row<25) && (checkShape(col, row, t_shape) == false) && (checkShape(col +1, row, t_shape) == false) && (checkShape(col +2, row, t_shape) == false)) {
               if(timer >= speed) {
                 timer = 0;
                 drawBlocks();
                 row++;
               } 
            }
            else{
                for (var i=0; i<t_shape.length; i++){
                deadBlocks.push({x:t_shape[i].x + col, y:t_shape[i].y + row-1});
                    score=deadBlocks.length;
                    document.getElementById("score").innerHTML = score;
                }
                x = 0;
                timer = 0;
                row = 0;
                col = 7;
                speed = 500; 
                R = Math.floor((Math.random()*3));
                for (var v=0; v<deadBlocks.length; v++){
                    if (deadBlocks[v].y == -1){
                    end = 1;
                    }
                }
            }
        }
    
  x += (timestamp - last) / 10;
  last = timestamp; 
}
    else {
        score = deadBlocks.length;
        if (score > highScore)
            highScore = score;
        document.getElementById("score").innerHTML = score;
        document.getElementById("high score").innerHTML = highScore;
    }
}

function checkfull(c, r){                   //loop through every block
  for(var k=0; k<deadBlocks.length; k++){
    if (deadBlocks[k].x == c){        //if there is a block in current col
      if (deadBlocks[k].y == r){    //and a block in the next row
        return true;         //true = there is something directly below the falling block
      } 
    }
  }
  return false; //nothing below
}

function checkShape(c, r, shape){
    for (var k=0; k<shape.length; k++){ //loop through each block in shape
        if (checkfull(c, r) == true) //check if there's a square below
            return true;
    }
    return false;
}

function checkshapeLeft(c, r, shape){
    for(var k=0; k<shape.length; k++){
        if (checkfullLeft(c,r) == true)
            return true;
    }
    return false;
}

function checkfullLeft(c, r){                   
  for(var k=0; k<deadBlocks.length; k++){
    if (deadBlocks[k].y == r){        
      if (deadBlocks[k].x == c-1){    
        return true;         
      } 
    }
  }
  return false; //nothing below
}

function checkShapeRight(c,r,shape){
    for (var k=0; k<shape.length; k++){ //loop through each block in shape
        if (checkfullRight(c, r) == true) //check if there's a square below
            return true;
    }
    return false;
}

function checkfullRight(c,r){                 
  for(var k=0; k<deadBlocks.length; k++){
    if (deadBlocks[k].y == r){        
      if (deadBlocks[k].x == c+1){    
        return true;         
      } 
    }
  }
  return false; //nothing below
}

function drawBlocks(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = randomColor();
    if (shapes[R] == square_shape){
         for (var i=0; i<square_shape.length; i++){
          ctx.fillRect((square_shape[i].x + col) * 20, (square_shape[i].y + row) * 20, 20, 20);
        }
    }
    if (shapes[R] == line_shape){
        for (var i=0; i<line_shape.length; i++){
          ctx.fillRect((line_shape[i].x + col) * 20, (line_shape[i].y + row) * 20, 20, 20);
        }
    }
    if (shapes[R] == t_shape){
         for (var i=0; i<t_shape.length; i++){
          ctx.fillRect((t_shape[i].x + col) * 20, (t_shape[i].y + row) * 20, 20, 20);
        }
    }
  
  for(var k=0;k<deadBlocks.length;k++){
    ctx.fillStyle = randomColor();
    ctx.fillRect(deadBlocks[k].x * 20, deadBlocks[k].y * 20, 20, 20);
  }
}


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
  case "ArrowDown":
    // code for "down arrow" key press.
        speed -= 499;
          
    break;
  case "ArrowUp":
    // code for "up arrow" key press.
        speed = 500;  
    break;
  case "ArrowLeft":
    // code for "left arrow" key press.
    if(col > 0 && row<25 && checkfullLeft(col, row) == false){  
      col--;
      drawBlocks();
    }
    break;
  case "ArrowRight":
    // code for "right arrow" key press.
    if (shapes[R] == square_shape){
        if(col < 13 && row<25 && checkShapeRight(col+1,row, square_shape) == false && checkShapeRight(col,row, square_shape) == false){
        col++;
        drawBlocks();
    }
    }
    if (shapes[R] == line_shape){
        if((col < 14 && row<25 && checkShapeRight(col,row, line_shape) == false) && (checkShapeRight(col,row-1, line_shape) == false) && (checkShapeRight(col,row-2, line_shape) == false) && (checkShapeRight(col,row-3, line_shape) == false)){
        col++;
        drawBlocks();
    }
    }
    if (shapes[R] == t_shape){
        if(col < 12 && row<25 && checkShapeRight(col,row+2, t_shape) == false && checkShapeRight(col+1,row+1, t_shape) == false){
        col++;
        drawBlocks();
    }
    }
    
    break;
    default:
    return; // Quit when this doesn't handle the key event.
  }

    document.body.onkeyup = function(e){ //spacebar
    if(e.keyCode == 32){
        speed = 500;
    }
}
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window











