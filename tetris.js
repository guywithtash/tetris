
var canvas = document.getElementById("tetris").getContext("2d");

var score = 0;

var map = new Array(20);//init map cols
for (var i = 0; i < map.length; i++) {
   map[i] = new Array(10);//init map rows
   for (var j = 0; j < map[i].length; j++) {
       map[i][j] = '';
   }
}
var T = random_tetromino(); //init current tetromino
T.origin = T.blocks[1]
window.onkeydown = handler;

draw_map();
setInterval(tick, 1000); //start tick function and repeat every 1000 milliseconds
function tetromino(type) { //create tetrimino class
   switch (type) {//set the starting info depending on the type
       case "I":
           this.blocks=[{x: 3, y: 0}, {x:4, y:0}, {x:5, y:0}, {x:6, y:0}];//set starting coordinates
           this.colour = "cyan";//set colour
           break;
       case "J":
           this.blocks=[{x: 4, y: 0}, {x:5, y:0}, {x:6, y:0}, {x:6, y:1}];
           this.colour = "blue";
           break;
       case "L":
           this.blocks=[{x: 3, y: 0}, {x:4, y:0}, {x:5, y:0}, {x:3, y:1}];
           this.colour = "orange";
           this.origin = {x:4, y:0}
           break;
       case "O":
           this.blocks=[{x: 4, y: 0}, {x:5, y:0}, {x:4, y:1}, {x:5, y:1}];
           this.colour = "yellow";
           break;
       case "S":
           this.blocks=[{x: 5, y: 0}, {x:6, y:0}, {x:4, y:1}, {x:5, y:1}];
           this.colour = "lime";
           break;
       case "Z":
           this.blocks=[{x: 3, y: 0}, {x:4, y:0}, {x:4, y:1}, {x:5, y:1}];
           this.colour = "red";
           break;
       case "T":
           var r = Math.floor(Math.random() * 2);
           if (r === 0) {
               this.blocks=[{x: 3, y: 0}, {x:4, y:0}, {x:5, y:0}, {x:4, y:1}];
           } else {
               this.blocks=[{x: 4, y: 0}, {x:5, y:0}, {x:6, y:0}, {x:5, y:1}];
           }
           this.colour = "purple";
           break;
   }

   //this.origin = {x:4.5, y:0.5}

   this.rotate = function() {//declare rotate function
       for (let block of this.blocks) { //init for loop that iterates through this.blocks
           var x = block.x - this.origin.x;//subtract origin from x and y values
           var y = block.y - this.origin.y;

           var temp = x;//set temp value for x
           x = y;//rotate x
           y = -temp;//rotate y

           block.x = x + this.origin.x;//add the origin from x and y back
           block.y = y + this.origin.y;
       }
   };

   this.lock = function() {//declare lock function
       for (let block of this.blocks) {//iterate through blocks in tetromino
           map[block.y][block.x] = this.colour;//set the value on the map to the colour on the tetromino
       }
       score += 4//add 4 to score
   };

   this.is_blocked = function(direction) {//declare lock function
       for (let block of this.blocks) {//iterate through blocks
           var x = block.x; //set temp variables
           var y = block.y;
           switch (direction) {
               case "left":
                   if (x - 1 < 0) return true;//check if is gonna go into the wall
                   if (map[y][x - 1] != '') return true;//check if block is contained by a locked tetromino
                   break;
               case "right":
                   if (x + 1 >= map[0].length - 1) return true;
                   if (map[y][x + 1] != '') return true;
                   break;
               case "down":
                   if (y + 1 >= map.length - 1) return true;
                   if (map[y + 1][x] != '') return true;
                   break;
           }
       }
       return false;
   };

   this.move = function(direction) {//declare move function
       if (this.is_blocked(direction)) return;//check if blocked in given direction
       for (let i of this.blocks) {//iterate through blocks of tetromino
           switch (direction) {
               case "left":
                   i.x--;//move in direction
                   //this.origin.x--;//move origin
                   break;
               case "right":
                   i.x++;
                   //this.origin.x++;
                   break;
               case "down":
                   i.y++;
                   //this.origin.y++;
                   break;
           }
       }
   };

   this.drop = function() {//init drop function
       while (!T.is_blocked("down")) {//loop while it's not blocked downwards
           T.move("down");//move down
       }
       T.lock();//lock tetromino
   };

   this.draw = function() {//init draw
       canvas.fillStyle = this.colour;
       for (let i of this.blocks) {//iterate through blocks
           canvas.fillRect(i.x * 20, i.y * 20, 20, 20);//draw rectangle
       }
   };
}

function height(){
   for (var i = 0; i < map.length; i++){//go through each row of the map
       for (var j = 0; j < map[i].length; j++) {//go through each block on the row
           if (map[i][j] !== ''){//if the block is contained
               return i;//return the height
           }
       }
   }
}

function random_tetromino() {
   var r = Math.floor(Math.random() * 7) ;//generate random number from 0-6
   var types = ["I", "J", "L", "O", "S", "T", "Z"];//array with all the types of tetromino
   return new tetromino(types[r]);//return the type of tetromino just generated
   console.log(type[r])
}

function draw_map() {//dec draw map
   canvas.clearRect(0, 0, 200, 400);//clear the previously drawn map
   for (let y in map) {//iterate through rows in map
       for (let x in map[y]) {//iterate through block in each row
           if (map[y][x] != ''){//if block not empty
               canvas.beginPath();
               canvas.rect(x * 20, y * 20, 20, 20);
               canvas.fillStyle = map[y][x];
               canvas.fill();//draw rectangle at position
           }
       }
   }
   T.draw();
}

function handler(event) {//dec handler
   switch (event.keyCode) {//take in keycode and decide what to do with it
       case 37:
           T.move("left");
           break;
       case 39:
           T.move("right");
           break;
       case 38:
           T.rotate();
           break;
       case 32:
           T.drop();
           break;
       case 40:
           T.move("down");
           break;
   }
   draw_map();
}

function row_full(row) {//dec row_full function
   for (let i of map[row]) {//iterate through each block in given row
       if (i == '') return false;//if any block is empty return false
   }
   return true;
}

function clear_row(row) {//dec clear row
   for (let i of map[row]) {//go through each block in the row
       map[i] = map[i - 1];//shift blocks down
   }
}


function tick() {
   if (height() < 1){//if blocks stacked to top of the map
       clearInterval(tick());//stop the game
   }
   if (T.is_blocked("down")) {//check if blocked down
       T.lock();// lock tetromino
       T = random_tetromino();//generate new tetromino
   } else {
       T.move("down");//move down
   }
   T.origin = T.blocks[1]
   if (row_full(map.length - 1)) {
       clear_row(map.length - 1);
       score += 10;
   }
   draw_map();
}
