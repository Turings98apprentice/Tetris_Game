var canvas, ctx, x, last, timer, row, col, deadBlocks, currentrow, currentcol;

$(document).ready(function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  x = 0;
  timer = 0;
  row = 0;
  col = 7;
  deadBlocks = [];
  last = performance.now();
  requestAnimationFrame(draw);
});



function draw(timestamp) {

  requestAnimationFrame(draw);
  timer += timestamp - last;   
  
  if((row<25) && (checkfull() == false)){
    if(timer >= 200) {
      timer = 0;
      drawBlocks();
      row++;
    } 
  } else{
    deadBlocks.push({x:col, y:row-1});
    console.log(deadBlocks);
    x = 0;
    timer = 0;
    row = 0;
    col = 7;
  }
  
  x += (timestamp - last) / 10;
  last = timestamp; 

}

function checkfull(){                   //loop through every block
  for(var k=0; k<deadBlocks.length; k++){
    // console.log("deadblock row = " + deadBlocks[k].y);
    // console.log("deadblock column = " + deadBlocks[k].x);
    if (deadBlocks[k].x == col){        //if there is a block in current col
      if (deadBlocks[k].y == row){    //and a block in the next row
        return true;         //true = there is something directly below the falling block
      } 
    }
  }
  return false; //nothing below
}

function checkfullLeft(){                   //loop through every block
  for(var k=0; k<deadBlocks.length; k++){
    // console.log("deadblock row = " + deadBlocks[k].y);
    // console.log("deadblock column = " + deadBlocks[k].x);
    if (deadBlocks[k].y == row){        
      if (deadBlocks[k].x == col-1){    
        return true;         
      } 
    }
  }
  return false; //nothing below
}

function checkfullRight(){                   //loop through every block
  for(var k=0; k<deadBlocks.length; k++){
    // console.log("deadblock row = " + deadBlocks[k].y);
    // console.log("deadblock column = " + deadBlocks[k].x);
    if (deadBlocks[k].y == row){        
      if (deadBlocks[k].x == col+1){    
        return true;         
      } 
    }
  }
  return false; //nothing below
}

function drawBlocks(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(col * 20, row * 20, 20, 20);
  //ctx.fill(); 
  
  for(var k=0;k<deadBlocks.length;k++){
    //ctx.beginPath();
    ctx.fillStyle = "#00ff00";
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
    break;
  case "ArrowUp":
    // code for "up arrow" key press.
    break;
  case "ArrowLeft":
    // code for "left arrow" key press.
    if(col > 0 && row<25 && checkfullLeft() == false){  
      col--;
      drawBlocks();
    }
    break;
  case "ArrowRight":
    // code for "right arrow" key press.
    if(col < 14 && row<25 && checkfullRight() == false){
      col++;
      drawBlocks();
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











